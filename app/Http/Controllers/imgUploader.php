<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;

class imgUploader extends Controller
{
    public function offerImg(Request $request) {
        $request->validate([
            'img' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        $image = $request->file('img');
        $currentDateTime = Carbon::now()->format('Ymd_His');
        $encyptedName =  hash('sha256', $currentDateTime) . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('images', $encyptedName, 'public/offers');
        $imageModel = new Image();
        $imageModel->path = $path;
        $imageModel->save();
        
    }
}
