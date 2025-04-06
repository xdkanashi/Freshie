<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ClothesResource\Pages;
use App\Models\Clothes;
use App\Models\ClothesImage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ClothesResource extends Resource
{
    protected static ?string $model = Clothes::class;

    protected static ?string $navigationLabel = 'Clothes';
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationGroup = 'Shop';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(100),

                Forms\Components\TextInput::make('price')
                    ->label('Price')
                    ->numeric()
                    ->required(),

                Forms\Components\Textarea::make('description')
                    ->label('Description')
                    ->rows(6)
                    ->nullable(),

                // Повторитель для отображения и загрузки изображений
                Forms\Components\Repeater::make('clothes_images')
                    ->label('Images')
                    ->maxItems(4)
                    ->relationship('clothesImages')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Image')
                            ->image()
                            ->directory('clothes-images')
                            ->required(false)
                            ->disk('public'),
                    ])
                    ->columns(2)
                    ->createItemButtonLabel('Add Image'),

                Forms\Components\Toggle::make('pre_order')
                    ->label('Pre Order')
                    ->inline()
                    ->default(false),

                Forms\Components\Toggle::make('is_sold_out')
                    ->label('Sold Out')
                    ->inline()
                    ->default(false),

                Forms\Components\Select::make('category')
                    ->label('Category')
                    ->options([
                        'Long Sleeves' => 'Long Sleeves',
                        'Zip Hoodies' => 'Zip Hoodies',
                        'Hoodies' => 'Hoodies',
                        'Accessories' => 'Accessories',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('discount')
                    ->label('Discount')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('category')
                    ->label('Category')
                    ->sortable(),

                Tables\Columns\TextColumn::make('price')
                    ->label('Price')
                    ->sortable(),

                // Выводим изображения
                Tables\Columns\ImageColumn::make('image')
                    ->label('Photo')
                    ->getStateUsing(function ($record) {
                        // Получаем первое изображение для данного продукта или дефолтное изображение
                        $firstImage = $record->clothesImages()->first();
                        return $firstImage ? asset('storage/' . $firstImage->image) : asset('img/BOXY_FIT_TEE_FRONT.webp');
                    })
                    ->width(100)
                    ->height(100),

                Tables\Columns\BooleanColumn::make('pre_order')
                    ->label('Pre Order')
                    ->sortable(),

                Tables\Columns\TextColumn::make('discount')
                    ->label('Discount')
                    ->sortable(),

                Tables\Columns\BooleanColumn::make('is_sold_out')
                    ->label('Sold Out')
                    ->sortable(),
            ])
            ->filters([])
            ->actions([
                // Удаляем действие "Delete Image" из списка
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListClothes::route('/'),
            'create' => Pages\CreateClothes::route('/create'),
            'edit' => Pages\EditClothes::route('/{record}/edit'),
        ];
    }
}
