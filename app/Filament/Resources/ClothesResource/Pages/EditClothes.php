<?php

namespace App\Filament\Resources\ClothesResource\Pages;

use App\Filament\Resources\ClothesResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditClothes extends EditRecord
{
    protected static string $resource = ClothesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
