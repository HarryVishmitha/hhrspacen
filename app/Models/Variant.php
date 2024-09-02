<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

// class Vearient extends Model
// {
//     protected $fillable = ['product_id', 'related_product_ids'];

//     protected $casts = [
//         'related_product_ids' => 'array',
//     ];

//     public function product()
//     {
//         return $this->belongsTo(Product::class);
//     }

//     public function relatedProducts()
//     {
//         // Ensure related_product_ids is an array before querying
//         $relatedProductIds = $this->related_product_ids ?? [];
//         if (empty($relatedProductIds)) {
//             return collect([]);
//         }
//         return Product::whereIn('id', $relatedProductIds)->get();
//     }
// }
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    // Define the table name if it's not the plural form of the model name
    protected $table = 'variants';

    // Specify the fields that are mass assignable
    protected $fillable = [
        'product_id',
        'variant_type',
        'variant_value',
        'price',
        'stock',
    ];

    /**
     * Relationship to the Product model.
     * A variant belongs to a single product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Relationship to the Product model for related products.
     * This relationship is optional, as the structure of related products wasn't clearly defined.
     */
    public function relatedProducts()
    {
        // This method assumes you still want to manage related products,
        // but you'll need to handle it differently since `related_product_ids` is removed.
        // Consider using a pivot table or another mechanism for related products if needed.
        return $this->belongsToMany(Product::class, 'product_variant_relations', 'variant_id', 'related_product_id');
    }
}
