import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import Fade from '@/components/elements/Fade';
import { SwitchTransition } from 'react-transition-group';
import { Location } from 'react-router-dom';

const StyledSwitchTransition = styled(SwitchTransition)`
    ${tw`relative`};

    & section {
        ${tw`absolute w-full top-0 left-0`};
    }
`;

interface Props {
    children: React.ReactNode;
    location: Location;
}

const TransitionRouter: React.FC<Props> = ({ children, location }) => {
    return (
        <StyledSwitchTransition>
            <Fade timeout={150} key={location.pathname + location.search} in appear unmountOnExit>
                <section>{children}</section>
            </Fade>
        </StyledSwitchTransition>
    );
};

export default TransitionRouter;
