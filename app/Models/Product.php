<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
// use App\Models\PriceList;
// use App\Models\Vearient;

// class Product extends Model
// {
//     use HasFactory;
//     protected $fillable = [
//         'name', 'simple_description', 'description', 'published', 'template_type', 'vearients', 'links',
//     ];

//     public function priceLists()
//     {
//         return $this->hasMany(PriceList::class);
//     }
//     public function variants()
//     {
//         return $this->hasMany(Variant::class);
//     }
// }


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PriceList;
use App\Models\Variant;

class Product extends Model
{
    use HasFactory;

    // Specify the fields that are mass assignable
    protected $fillable = [
        'name',
        'simple_description',
        'description',
        'published',
        'template_type',
        'category_id',
        'links',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    /**
     * Relationship to the PriceList model.
     * A product can have many price lists.
     */
    public function priceLists()
    {
        return $this->hasMany(PriceList::class);
    }

    /**
     * Relationship to the Variant model.
     * A product can have many variants.
     */
    public function variants()
    {
        return $this->hasMany(Variant::class);
    }
}
