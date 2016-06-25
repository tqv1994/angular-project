<?php

use Phpmig\Migration\Migration;

class Create[files]s extends Migration
{
    protected $tableName;

    /* @var \Illuminate\Database\Schema\Builder $schema */
    protected $schema;
    
    public function init()
    {
        $this->tableName = '[files]s';
        $this->schema = $this->get('schema');
    }

    /**
     * Do the migration
     */
    public function up()
    {
        /* @var \Illuminate\Database\Schema\Blueprint $table */
        $this->schema->create($this->tableName, function ($table)
        {
            $table->increments('id');
            
            $table->integer('id');
            $table->string('title');
            $table->string('file');
            $table->integer('download');
            $table->string('auther');
            $table->string('text');
            $table->integer('time');
            $table->integer('status');
        });
    }

    /**
     * Undo the migration
     */
    public function down()
    {
        $this->schema->drop($this->tableName);
    }
}
