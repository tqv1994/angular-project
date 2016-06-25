<?php

class User extends Illuminate\Database\Eloquent\Model {

    protected $table = "users";
    public $timestamps = false;
    
    // need to explicitly cast attributes of type Integer, Float, Boolean 
    
    public function getIdAttribute($value)
    {
        return (integer) $value;
    }
    
    public function getTimeAttribute($value)
    {
        return (integer) $value;
    }
    
    public function getStatusAttribute($value)
    {
        return (integer) $value;
    }
    
}
