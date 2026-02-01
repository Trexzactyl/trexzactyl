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
            $table->string('client_number')->nullable()->after('status');
        });

        Schema::table('nagad', function (Blueprint $table) {
            $table->string('client_number')->nullable()->after('status');
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
            $table->dropColumn('client_number');
        });

        Schema::table('nagad', function (Blueprint $table) {
            $table->dropColumn('client_number');
        });
    }
};