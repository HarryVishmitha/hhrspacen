<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Dropping the existing table if it exists
        Schema::dropIfExists('variants');

        // Recreate the table with optimized structure
        Schema::create('variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('variant_type'); // e.g., 'size', 'color'
            $table->string('variant_value'); // e.g., 'M', 'Red'
            $table->decimal('price', 8, 2)->nullable(); // Additional price for this variant, if any
            $table->integer('stock')->default(0); // Stock count for this variant
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variants');
    }
};
