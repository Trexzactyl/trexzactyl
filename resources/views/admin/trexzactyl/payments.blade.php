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
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Pending Payments</h3>
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
                            @foreach ($payments as $payment)
                                <tr>
                                    <td>{{ $payment->id }}</td>
                                    <td><a
                                            href="{{ route('admin.users.view', $payment->user->id) }}">{{ $payment->user->username }}</a>
                                    </td>
                                    <td>{{ $payment->credit_amount }}</td>
                                    <td>{{ strtoupper($payment->currency) }}</td>
                                    <td>{{ $payment->sender_number }}</td>
                                    <td><code>{{ $payment->transaction_id }}</code></td>
                                    <td>{{ $payment->created_at->format('d M Y H:i') }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <form action="{{ route('admin.trexzactyl.payments.approve', $payment->id) }}"
                                                method="POST" style="display: inline;">
                                                {!! csrf_field() !!}
                                                <button type="submit" class="btn btn-sm btn-success">Approve</button>
                                            </form>
                                            <form action="{{ route('admin.trexzactyl.payments.reject', $payment->id) }}"
                                                method="POST" style="display: inline;">
                                                {!! csrf_field() !!}
                                                <button type="submit" class="btn btn-sm btn-danger">Reject</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            @if ($payments->isEmpty())
                                <tr>
                                    <td colspan="8" class="text-center">No pending payments found.</td>
                                </tr>
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection