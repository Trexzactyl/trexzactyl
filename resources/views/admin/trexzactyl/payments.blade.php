@extends('layouts.admin')
@include('partials/admin.trexzactyl.nav', ['activeTab' => 'payments'])

@section('title')
    Payment Approvals
@endsection

@section('content-header')
    <h1>Payment Approvals<small>Approve or reject manual payments.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Trexzactyl</li>
    </ol>
@endsection

@section('content')
    @yield('trexzactyl::nav')
    
    <div class="row">
        <div class="col-xs-12">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#manual" data-toggle="tab">Manual Payments</a></li>
                    <li><a href="#bkash" data-toggle="tab">bKash Payments</a></li>
                    <li><a href="#nagad" data-toggle="tab">Nagad Payments</a></li>
                </ul>
                <div class="tab-content">
                    <!-- Manual Payments Tab -->
                    <div class="active tab-pane" id="manual">
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">Pending Manual Payments</h3>
                                <div class="box-tools pull-right">
                                    <span class="badge bg-blue">{{ $payments->count() }} pending</span>
                                </div>
                            </div>
                            <div class="box-body table-responsive no-padding">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Sender Number</th>
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($payments as $payment)
                                            <tr>
                                                <td><span class="label label-default">#{{ $payment->id }}</span></td>
                                                <td>
                                                    <a href="{{ route('admin.users.view', $payment->user->id) }}" class="text-primary">
                                                        <i class="fa fa-user"></i> {{ $payment->user->username }}
                                                    </a>
                                                </td>
                                                <td><strong>{{ $payment->credit_amount }} Credits</strong></td>
                                                <td><span class="label label-info">{{ strtoupper($payment->currency) }}</span></td>
                                                <td><code>{{ $payment->sender_number }}</code></td>
                                                <td><code>{{ $payment->transaction_id }}</code></td>
                                                <td>
                                                    <i class="fa fa-clock-o"></i> 
                                                    {{ $payment->created_at->format('M d, Y H:i') }}
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <form action="{{ route('admin.trexzactyl.payments.approve', $payment->id) }}"
                                                            method="POST" style="display: inline;">
                                                            {!! csrf_field() !!}
                                                            <button type="submit" class="btn btn-xs btn-success" 
                                                                onclick="return confirm('Approve this payment?')">
                                                                <i class="fa fa-check"></i> Approve
                                                            </button>
                                                        </form>
                                                        <form action="{{ route('admin.trexzactyl.payments.process', $payment->id) }}"
                                                            method="POST" style="display: inline;">
                                                            {!! csrf_field() !!}
                                                            <button type="submit" class="btn btn-xs btn-primary">
                                                                <i class="fa fa-clock-o"></i> Processing
                                                            </button>
                                                        </form>
                                                        <button type="button" class="btn btn-xs btn-danger" 
                                                            onclick="showRejectModal('manual', {{ $payment->id }})">
                                                            <i class="fa fa-times"></i> Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td colspan="8" class="text-center text-muted">
                                                    <i class="fa fa-info-circle"></i> No pending manual payments found.
                                                </td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- bKash Payments Tab -->
                    <div class="tab-pane" id="bkash">
                        <div class="box box-success">
                            <div class="box-header with-border">
                                <h3 class="box-title">Pending bKash Payments</h3>
                                <div class="box-tools pull-right">
                                    <span class="badge bg-green">{{ $bkash->count() }} pending</span>
                                </div>
                            </div>
                            <div class="box-body table-responsive no-padding">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Credits</th>
                                            <th>BDT Amount</th>
                                            <th>Client Number</th>
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($bkash as $payment)
                                            <tr>
                                                <td><span class="label label-success">#{{ $payment->id }}</span></td>
                                                <td>
                                                    <a href="{{ route('admin.users.view', $payment->user->id) }}" class="text-primary">
                                                        <i class="fa fa-user"></i> {{ $payment->user->username }}
                                                    </a>
                                                </td>
                                                <td><strong>{{ $payment->amount }} Credits</strong></td>
                                                <td><span class="text-success">{{ $payment->amount * $ratio }} BDT</span></td>
                                                <td><code>{{ $payment->client_number ?? 'N/A' }}</code></td>
                                                <td><code>{{ $payment->transaction_id ?? 'Pending' }}</code></td>
                                                <td>
                                                    <i class="fa fa-clock-o"></i> 
                                                    {{ $payment->created_at->format('M d, Y H:i') }}
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <form action="{{ route('admin.trexzactyl.payments.bkash.approve', $payment->id) }}"
                                                            method="POST" style="display: inline;">
                                                            {!! csrf_field() !!}
                                                            <button type="submit" class="btn btn-xs btn-success"
                                                                onclick="return confirm('Approve this bKash payment?')">
                                                                <i class="fa fa-check"></i> Approve
                                                            </button>
                                                        </form>
                                                        <form action="{{ route('admin.trexzactyl.payments.bkash.process', $payment->id) }}"
                                                            method="POST" style="display: inline;">
                                                            {!! csrf_field() !!}
                                                            <button type="submit" class="btn btn-xs btn-primary">
                                                                <i class="fa fa-clock-o"></i> Processing
                                                            </button>
                                                        </form>
                                                        <button type="button" class="btn btn-xs btn-danger" 
                                                            onclick="showRejectModal('bkash', {{ $payment->id }})">
                                                            <i class="fa fa-times"></i> Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td colspan="8" class="text-center text-muted">
                                                    <i class="fa fa-info-circle"></i> No pending bKash payments found.
                                                </td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Nagad Payments Tab -->
                    <div class="tab-pane" id="nagad">
                        <div class="box box-danger">
                            <div class="box-header with-border">
                                <h3 class="box-title">Pending Nagad Payments</h3>
                                <div class="box-tools pull-right">
                                    <span class="badge bg-red">{{ $nagad->count() }} pending</span>
                                </div>
                            </div>
                            <div class="box-body table-responsive no-padding">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Credits</th>
                                            <th>BDT Amount</th>
                                            <th>Client Number</th>
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($nagad as $payment)
                                            <tr>
                                                <td><span class="label label-danger">#{{ $payment->id }}</span></td>
                                                <td>
                                                    <a href="{{ route('admin.users.view', $payment->user->id) }}" class="text-primary">
                                                        <i class="fa fa-user"></i> {{ $payment->user->username }}
                                                    </a>
                                                </td>
                                                <td><strong>{{ $payment->amount }} Credits</strong></td>
                                                <td><span class="text-danger">{{ $payment->amount * $ratio }} BDT</span></td>
                                                <td><code>{{ $payment->client_number ?? 'N/A' }}</code></td>
                                                <td><code>{{ $payment->transaction_id ?? 'Pending' }}</code></td>
                                                <td>
                                                    <i class="fa fa-clock-o"></i> 
                                                    {{ $payment->created_at->format('M d, Y H:i') }}
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <form action="{{ route('admin.trexzactyl.payments.nagad.approve', $payment->id) }}"
                                                            method="POST" style="display: inline;">
                                                            {!! csrf_field() !!}
                                                            <button type="submit" class="btn btn-xs btn-success"
                                                                onclick="return confirm('Approve this Nagad payment?')">
                                                                <i class="fa fa-check"></i> Approve
                                                            </button>
                                                        </form>
                                                        <form action="{{ route('admin.trexzactyl.payments.nagad.process', $payment->id) }}"
                                                            method="POST" style="display: inline;">
                                                            {!! csrf_field() !!}
                                                            <button type="submit" class="btn btn-xs btn-primary">
                                                                <i class="fa fa-clock-o"></i> Processing
                                                            </button>
                                                        </form>
                                                        <button type="button" class="btn btn-xs btn-danger" 
                                                            onclick="showRejectModal('nagad', {{ $payment->id }})">
                                                            <i class="fa fa-times"></i> Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td colspan="8" class="text-center text-muted">
                                                    <i class="fa fa-info-circle"></i> No pending Nagad payments found.
                                                </td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Reject Modal -->
    <div class="modal fade" id="rejectModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Reject Payment</h4>
                </div>
                <form id="rejectForm" method="POST">
                    {!! csrf_field() !!}
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="reason">Reason for rejection:</label>
                            <textarea class="form-control" id="reason" name="reason" rows="3" 
                                placeholder="Please provide a reason for rejecting this payment..." required></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-danger">
                            <i class="fa fa-times"></i> Reject Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        function showRejectModal(type, id) {
            var form = document.getElementById('rejectForm');
            var baseUrl = '{{ url('/admin/payments') }}';
            
            switch(type) {
                case 'manual':
                    form.action = baseUrl + '/reject/' + id;
                    break;
                case 'bkash':
                    form.action = baseUrl + '/bkash/reject/' + id;
                    break;
                case 'nagad':
                    form.action = baseUrl + '/nagad/reject/' + id;
                    break;
            }
            
            document.getElementById('reason').value = '';
            $('#rejectModal').modal('show');
        }

        // Auto-refresh every 30 seconds
        setTimeout(function() {
            location.reload();
        }, 30000);
    </script>

    <style>
        .nav-tabs-custom > .nav-tabs > li.active {
            border-top-color: #3c8dbc;
        }
        
        .table > tbody > tr > td {
            vertical-align: middle;
        }
        
        .btn-group .btn {
            margin-right: 2px;
        }
        
        .label {
            font-size: 11px;
        }
        
        code {
            background-color: #f4f4f4;
            color: #d14;
            padding: 2px 4px;
            border-radius: 3px;
        }
    </style>
@endsection