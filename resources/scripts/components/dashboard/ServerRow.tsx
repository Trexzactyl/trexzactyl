import tw from 'twin.macro';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Server } from '@/api/server/getServer';
import Spinner from '@/components/elements/Spinner';
import { bytesToString, ip } from '@/lib/formatters';
import React, { useEffect, useRef, useState } from 'react';
import getServerResourceUsage, { ServerPowerState, ServerStats } from '@/api/server/getServerResourceUsage';

const isAlarmState = (current: number, limit: number): boolean => limit > 0 && current / (limit * 1024 * 1024) >= 0.9;

const ServerCard = styled(Link) <{ $bg?: string }>`
    ${tw`relative flex flex-col p-5 rounded-xl border border-neutral-700 bg-neutral-900/50 backdrop-blur-md transition-all duration-300`};
    ${tw`hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1`};

    ${({ $bg }) => $bg && `
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("${$bg}");
            background-position: center;
            background-size: cover;
            opacity: 0.15;
            z-index: -1;
            transition: opacity 0.3s ease;
            border-radius: 0.75rem;
        }
    `}

    &:hover::before {
        opacity: 0.25;
    }
`;

const StatusIndicator = styled.div<{ $status: ServerPowerState | undefined }>`
    ${tw`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border`};
    ${({ $status }) =>
        !$status || $status === 'offline'
            ? `background-color: rgba(239, 68, 68, 0.1); color: rgb(248, 113, 113); border-color: rgba(239, 68, 68, 0.2);`
            : $status === 'running'
                ? `background-color: rgba(34, 197, 94, 0.1); color: rgb(74, 222, 128); border-color: rgba(34, 197, 94, 0.2);`
                : `background-color: rgba(234, 179, 8, 0.1); color: rgb(250, 204, 21); border-color: rgba(234, 179, 8, 0.2);`};

    & .dot {
        ${tw`w-1.5 h-1.5 rounded-full`};
        ${({ $status }) =>
        !$status || $status === 'offline' ? tw`bg-red-500` : $status === 'running' ? tw`bg-green-500 animate-pulse` : tw`bg-yellow-500 animate-pulse`};
    }
`;

const ResourceSection = styled.div`
    ${tw`grid grid-cols-3 gap-4 mt-6`};
`;

const ProgressBar = styled.div<{ $percent: number; $alarm?: boolean }>`
    ${tw`h-1 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden`};
    & .fill {
        width: ${({ $percent }) => $percent}%;
        ${tw`h-full transition-all duration-500 ease-out`};
        ${({ $alarm }) => ($alarm ? tw`bg-red-500` : tw`bg-blue-500`)};
    }
`;

const Label = styled.div`
    ${tw`text-[10px] text-neutral-500 uppercase font-bold tracking-wider flex items-center gap-1`};
`;

const Value = styled.div<{ $alarm?: boolean }>`
    ${tw`text-xs font-semibold mt-0.5`};
    ${({ $alarm }) => $alarm ? tw`text-red-400` : tw`text-neutral-200`};
`;

type Timer = ReturnType<typeof setInterval>;

const ServerRow = ({ server, className }: { server: Server; className?: string }) => {
    const interval = useRef<Timer>(null) as React.MutableRefObject<Timer>;
    const [isSuspended, setIsSuspended] = useState(server.status === 'suspended');
    const [stats, setStats] = useState<ServerStats | null>(null);

    const getStats = () =>
        getServerResourceUsage(server.uuid)
            .then((data) => setStats(data))
            .catch((error) => console.error(error));

    useEffect(() => {
        setIsSuspended(stats?.isSuspended || server.status === 'suspended');
    }, [stats?.isSuspended, server.status]);

    useEffect(() => {
        if (isSuspended) return;
        getStats().then(() => {
            interval.current = setInterval(() => getStats(), 30000);
        });
        return () => { interval.current && clearInterval(interval.current); };
    }, [isSuspended]);

    const alarms = { cpu: false, memory: false, disk: false };
    if (stats) {
        alarms.cpu = server.limits.cpu === 0 ? false : stats.cpuUsagePercent >= server.limits.cpu * 0.9;
        alarms.memory = isAlarmState(stats.memoryUsageInBytes, server.limits.memory);
    }

    const cpuPercent = stats ? Math.min((stats.cpuUsagePercent / (server.limits.cpu || 100)) * 100, 100) : 0;
    const memPercent = stats ? Math.min((stats.memoryUsageInBytes / (server.limits.memory * 1024 * 1024)) * 100, 100) : 0;

    return (
        <ServerCard to={`/server/${server.uuid}`} className={`${className || ''} group`} $bg={server.bg}>
            <div css={tw`flex justify-between items-start`}>
                <div css={tw`flex-1 min-w-0`}>
                    <h4 css={tw`text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors`}>{server.name}</h4>
                    <div css={tw`flex items-center gap-1.5 text-neutral-400 text-xs mt-1`}>
                        <Icon.MapPin size={12} />
                        <span css={tw`truncate`}>
                            {server.allocations
                                .filter((alloc) => alloc.isDefault)
                                .map((allocation) => (
                                    <React.Fragment key={allocation.ip + allocation.port.toString()}>
                                        {allocation.alias || ip(allocation.ip)}:{allocation.port}
                                    </React.Fragment>
                                ))}
                        </span>
                    </div>
                </div>

                <StatusIndicator $status={stats?.status}>
                    <div className="dot" />
                    {isSuspended ? 'Suspended' : (stats?.status || server.status || 'Offline')}
                </StatusIndicator>
            </div>

            <div css={tw`flex-1`}>
                {!stats && !isSuspended && !server.isTransferring && server.status !== 'installing' ? (
                    <div css={tw`flex items-center justify-center h-full mt-4`}>
                        <Spinner size={'small'} />
                    </div>
                ) : (
                    <ResourceSection>
                        <div>
                            <Label><Icon.Cpu size={10} /> CPU</Label>
                            <Value $alarm={alarms.cpu}>
                                {isSuspended ? '0%' : `${stats?.cpuUsagePercent.toFixed(1)}%`}
                            </Value>
                            <ProgressBar $percent={isSuspended ? 0 : cpuPercent} $alarm={alarms.cpu}>
                                <div className="fill" />
                            </ProgressBar>
                        </div>
                        <div>
                            <Label><Icon.PieChart size={10} /> RAM</Label>
                            <Value $alarm={alarms.memory}>
                                {isSuspended ? '0 B' : bytesToString(stats?.memoryUsageInBytes || 0)}
                            </Value>
                            <ProgressBar $percent={isSuspended ? 0 : memPercent} $alarm={alarms.memory}>
                                <div className="fill" />
                            </ProgressBar>
                        </div>
                        <div>
                            <Label><Icon.HardDrive size={10} /> DISK</Label>
                            <Value>
                                {bytesToString(stats?.diskUsageInBytes || 0)}
                            </Value>
                            <ProgressBar $percent={0}>
                                <div className="fill" />
                            </ProgressBar>
                        </div>
                    </ResourceSection>
                )}
            </div>

            <div css={tw`mt-4 flex justify-between items-center text-[10px] text-neutral-500 font-medium`}>
                <div css={tw`flex items-center gap-1`}>
                    <Icon.Grid size={10} />
                    {server.node}
                </div>
                <div css={tw`flex items-center gap-1`}>
                    <Icon.Terminal size={10} />
                    Console
                </div>
            </div>
        </ServerCard>
    );
};

export default ServerRow;
