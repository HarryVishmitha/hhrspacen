<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PriceList;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'simple_description', 'description', 'published', 'template_type'
    ];

    public function priceLists()
    {
        return $this->hasMany(PriceList::class);
    }
}
