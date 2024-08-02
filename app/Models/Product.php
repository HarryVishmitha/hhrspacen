<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PriceList;
use App\Models\Vearient;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'simple_description', 'description', 'published', 'template_type', 'vearients'
    ];

    public function priceLists()
    {
        return $this->hasMany(PriceList::class);
    }
    public function variants()
    {
        return $this->hasMany(Vearient::class);
    }
}
