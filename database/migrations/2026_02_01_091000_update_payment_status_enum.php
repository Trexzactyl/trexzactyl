<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bkash', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('bkash', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected', 'processing'])->default('pending')->after('payment_id');
        });

        Schema::table('nagad', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('nagad', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected', 'processing'])->default('pending')->after('payment_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bkash', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('bkash', function (Blueprint $table) {
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending')->after('payment_id');
        });

        Schema::table('nagad', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('nagad', function (Blueprint $table) {
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending')->after('payment_id');
        });
    }
};