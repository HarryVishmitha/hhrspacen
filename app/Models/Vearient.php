<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vearient extends Model
{
    protected $fillable = ['product_id', 'related_product_ids'];

    protected $casts = [
        'related_product_ids' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function relatedProducts()
    {
        return Product::whereIn('id', $this->related_product_ids)->get();
    }
}
