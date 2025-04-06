<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart'; // Иконка для навигации

    protected static ?string $navigationLabel = 'Orders'; // Название в меню

    protected static ?string $navigationGroup = 'Orders'; // Группа в меню (если нужно)

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('order_number')
                ->required()
                ->label('Order Number'),

            Forms\Components\TextInput::make('customer_name')
                ->required()
                ->label('Customer Name'),

            Forms\Components\Select::make('status')
                ->options([
                    'pending' => 'Pending',
                    'processing' => 'Processing',
                    'completed' => 'Completed',
                    'canceled' => 'Canceled',
                ])
                ->default('pending')
                ->required()
                ->label('Status'),

            Forms\Components\Textarea::make('notes')
                ->nullable()
                ->label('Notes'),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('order_number')
                ->sortable()
                ->searchable()
                ->label('Order Number'),

            Tables\Columns\TextColumn::make('customer_name')
                ->sortable()
                ->searchable()
                ->label('Customer Name'),

            Tables\Columns\SelectColumn::make('status')
                ->options([
                    'pending' => 'Pending',
                    'processing' => 'Processing',
                    'completed' => 'Completed',
                    'canceled' => 'Canceled',
                ])
                ->label('Status'),

            Tables\Columns\TextColumn::make('created_at')
                ->dateTime('d M Y')
                ->label('Created At'),
        ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'canceled' => 'Canceled',
                    ])
                    ->label('Status'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}

