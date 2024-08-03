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
        // Ensure related_product_ids is an array before querying
        $relatedProductIds = $this->related_product_ids ?? [];
        if (empty($relatedProductIds)) {
            return collect([]);
        }
        return Product::whereIn('id', $relatedProductIds)->get();
    }
}
