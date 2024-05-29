<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class PriceList extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id', 'price', 'updated_on'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
