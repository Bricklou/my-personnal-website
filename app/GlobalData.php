<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GlobalData extends Model
{
    protected $fillable = ['key', 'value'];
    public $timestamps = false;
}
