<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CouponResource\Pages;
use App\Models\Coupon;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;
use Filament\Forms\Components\Actions\Action;
use Illuminate\Support\Str;

class CouponResource extends Resource
{
    protected static ?string $model = Coupon::class;

    protected static ?string $navigationIcon = 'heroicon-o-gift';

    protected static ?string $navigationLabel = 'Coupons';

    protected static ?string $navigationGroup = 'Marketing';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\Grid::make(1)
                ->schema([
                    Forms\Components\Section::make('Coupon Information')
                        ->schema([
                            Forms\Components\Grid::make(2)
                                ->schema([
                                    Forms\Components\TextInput::make('coupon_code')
                                        ->required()
                                        ->label('Coupon Code')
                                        ->unique(ignoreRecord: true)
                                        ->suffixAction(
                                            Action::make('generateCoupon')
                                                ->icon('heroicon-o-sparkles')
                                                ->tooltip('Generate random coupon code')
                                                ->action(function (Forms\Set $set) {
                                                    $set('coupon_code', self::generateCouponCode());
                                                })
                                        ),

                                    Forms\Components\Select::make('coupon_type')
                                        ->label('Coupon Type')
                                        ->required()
                                        ->options([
                                            'percentage' => 'Percentage Discount',
                                            'fixed' => 'Fixed Discount',
                                            'delivery_discount' => 'Delivery Discount',
                                            'clothing_discount' => 'Clothing Discount',
                                            'free_item' => 'Free Item',
                                        ])
                                        ->default('percentage')
                                        ->reactive(),
                                ]),

                            Forms\Components\Grid::make(2)
                                ->schema([
                                    Forms\Components\TextInput::make('discount_percentage')
                                        ->numeric()
                                        ->label('Discount Percentage')
                                        ->minValue(1)
                                        ->maxValue(100)
                                        ->required(
                                            fn(Forms\Get $get) =>
                                            in_array($get('coupon_type'), ['percentage', 'clothing_discount'])
                                        )
                                        ->visible(
                                            fn(Forms\Get $get) =>
                                            in_array($get('coupon_type'), ['percentage', 'clothing_discount'])
                                        ),

                                    Forms\Components\TextInput::make('delivery_discount_amount')
                                        ->numeric()
                                        ->label('Delivery Discount Amount')
                                        ->prefix('$')
                                        ->minValue(1)
                                        ->required(fn(Forms\Get $get) => $get('coupon_type') === 'delivery_discount')
                                        ->visible(fn(Forms\Get $get) => $get('coupon_type') === 'delivery_discount'),

                                    Forms\Components\TextInput::make('delivery_discount_amount')
                                        ->numeric()
                                        ->label('Fixed Discount Amount')
                                        ->prefix('$')
                                        ->minValue(1)
                                        ->required(fn(Forms\Get $get) => $get('coupon_type') === 'fixed')
                                        ->visible(fn(Forms\Get $get) => $get('coupon_type') === 'fixed'),

                                    Forms\Components\Select::make('free_item_id')
                                        ->label('Free Item')
                                        ->relationship('freeItem', 'name')
                                        ->searchable()
                                        ->preload()
                                        ->required(fn(Forms\Get $get) => $get('coupon_type') === 'free_item')
                                        ->visible(fn(Forms\Get $get) => $get('coupon_type') === 'free_item'),

                                    Forms\Components\Toggle::make('is_active')
                                        ->label('Active')
                                        ->default(true),
                                ]),

                            Forms\Components\Grid::make(2)
                                ->schema([
                                    Forms\Components\DatePicker::make('valid_from')
                                        ->label('Valid From')
                                        ->default(now()),

                                    Forms\Components\DatePicker::make('valid_until')
                                        ->label('Valid Until')
                                        ->default(now()->addDays(30)),
                                ]),

                            Forms\Components\Grid::make(2)
                                ->schema([
                                    Forms\Components\TextInput::make('min_order_amount')
                                        ->label('Minimum Order Amount')
                                        ->prefix('$')
                                        ->numeric()
                                        ->default(0),

                                    Forms\Components\TextInput::make('usage_limit')
                                        ->label('Usage Limit')
                                        ->helperText('Maximum number of times this coupon can be used. Leave empty for unlimited.')
                                        ->numeric()
                                        ->minValue(1)
                                        ->nullable(),
                                ]),

                            Forms\Components\Textarea::make('description')
                                ->nullable()
                                ->label('Description'),

                            Forms\Components\Section::make('Coupon Generator Options')
                                ->schema([
                                    Forms\Components\Grid::make(3)
                                        ->schema([
                                            Forms\Components\Select::make('generator_type')
                                                ->label('Code Format')
                                                ->options([
                                                    'alphanumeric' => 'Alphanumeric',
                                                    'alphabetic' => 'Alphabetic only',
                                                    'numeric' => 'Numeric only',
                                                ])
                                                ->default('alphanumeric')
                                                ->reactive(),

                                            Forms\Components\TextInput::make('coupon_length')
                                                ->label('Length')
                                                ->numeric()
                                                ->default(8)
                                                ->minValue(4)
                                                ->maxValue(16),

                                            Forms\Components\Toggle::make('use_prefix')
                                                ->label('Add Prefix')
                                                ->default(false)
                                                ->reactive(),
                                        ]),

                                    Forms\Components\Grid::make(2)
                                        ->schema([
                                            Forms\Components\TextInput::make('prefix')
                                                ->label('Prefix')
                                                ->default('SALE')
                                                ->visible(fn(Forms\Get $get) => $get('use_prefix')),

                                            Forms\Components\Actions::make([
                                                Action::make('generateWithOptions')
                                                    ->label('Generate With Options')
                                                    ->action(function (Forms\Set $set, Forms\Get $get) {
                                                        $type = $get('generator_type');
                                                        $length = $get('coupon_length');
                                                        $usePrefix = $get('use_prefix');
                                                        $prefix = $get('prefix');

                                                        $couponCode = self::generateCouponCode($type, (int) $length);

                                                        if ($usePrefix && $prefix) {
                                                            $couponCode = $prefix . '-' . $couponCode;
                                                        }

                                                        $set('coupon_code', $couponCode);
                                                    })
                                                    ->color('primary')
                                            ]),
                                        ]),
                                ])
                                ->collapsible(),
                        ]),
                ]),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('coupon_code')
                ->sortable()
                ->searchable()
                ->label('Coupon Code')
                ->copyable()
                ->copyMessage('Coupon code copied')
                ->copyMessageDuration(1500),

            // Fix for BadgeColumn
            Tables\Columns\TextColumn::make('coupon_type')
                ->label('Type')
                ->formatStateUsing(function ($state) {
                    return $state ? match ($state) {
                        'percentage' => 'Percentage',
                        'fixed' => 'Fixed',
                        'delivery_discount' => 'Delivery',
                        'clothing_discount' => 'Clothing',
                        'free_item' => 'Free Item',
                        default => $state,
                    } : 'Unknown'; // Возвращаем 'Unknown', если coupon_type не установлен
                })
                ->badge()
                ->color(function ($state) {
                    return match ($state) {
                        'percentage' => 'primary',
                        'fixed' => 'info',
                        'delivery_discount' => 'success',
                        'clothing_discount' => 'warning',
                        'free_item' => 'danger',
                        default => 'gray',
                    };
                }),

            Tables\Columns\TextColumn::make('discount_percentage')
                ->sortable()
                ->label('Discount')
                ->suffix('%')
                ->visible(
                    fn($record) => $record && isset($record->coupon_type) && in_array($record->coupon_type, ['percentage', 'clothing_discount'])
                ),

            Tables\Columns\TextColumn::make('delivery_discount_amount')
                ->money('USD')
                ->label('Discount Amount')
                ->visible(fn($record) => $record && in_array($record->coupon_type ?? '', ['fixed', 'delivery_discount'])),

            Tables\Columns\TextColumn::make('freeItem.name')
                ->label('Free Item')
                ->visible(fn($record) => ($record->coupon_type ?? null) === 'free_item'),

            Tables\Columns\IconColumn::make('is_active')
                ->boolean()
                ->label('Active'),

            Tables\Columns\TextColumn::make('valid_until')
                ->date()
                ->sortable()
                ->label('Expires'),

            Tables\Columns\TextColumn::make('usage_count')
                ->label('Used'),

            Tables\Columns\TextColumn::make('created_at')
                ->dateTime('d M Y')
                ->label('Created At')
                ->toggleable(isToggledHiddenByDefault: true),
        ])
            ->filters([
                Tables\Filters\SelectFilter::make('coupon_type')
                    ->label('Type')
                    ->options([
                        'percentage' => 'Percentage Discount',
                        'fixed' => 'Fixed Discount',
                        'delivery_discount' => 'Delivery Discount',
                        'clothing_discount' => 'Clothing Discount',
                        'free_item' => 'Free Item',
                    ]),

                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status')
                    ->placeholder('All Coupons')
                    ->trueLabel('Active Coupons')
                    ->falseLabel('Inactive Coupons'),

                Tables\Filters\Filter::make('valid')
                    ->label('Valid Coupons')
                    ->query(function ($query) {
                        return $query->where('valid_until', '>=', now());
                    }),
            ])
            ->actions([
                Tables\Actions\Action::make('toggleActive')
                    ->label(fn($record) => $record->is_active ? 'Deactivate' : 'Activate')
                    ->color(fn($record) => $record->is_active ? 'danger' : 'success')
                    ->icon(fn($record) => $record->is_active ? 'heroicon-o-x-circle' : 'heroicon-o-check-circle')
                    ->action(function ($record) {
                        $record->is_active = !$record->is_active;
                        $record->save();
                    }),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
                Tables\Actions\BulkAction::make('activateBulk')
                    ->label('Activate')
                    ->icon('heroicon-o-check')
                    ->action(function ($records) {
                        foreach ($records as $record) {
                            $record->is_active = true;
                            $record->save();
                        }
                    })
                    ->deselectRecordsAfterCompletion(),

                Tables\Actions\BulkAction::make('deactivateBulk')
                    ->label('Deactivate')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->action(function ($records) {
                        foreach ($records as $record) {
                            $record->is_active = false;
                            $record->save();
                        }
                    })
                    ->deselectRecordsAfterCompletion(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCoupons::route('/'),
            'create' => Pages\CreateCoupon::route('/create'),
            'edit' => Pages\EditCoupon::route('/{record}/edit'),
        ];
    }

    /**
     * Generate a random coupon code
     *
     * @param string $type The type of coupon code (alphanumeric, alphabetic, or numeric)
     * @param int $length The length of the coupon code
     * @return string
     */
    public static function generateCouponCode(string $type = 'alphanumeric', int $length = 8): string
    {
        switch ($type) {
            case 'alphabetic':
                $characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Removed similar-looking characters
                break;
            case 'numeric':
                $characters = '23456789'; // Removed 0 and 1 to avoid confusion
                break;
            case 'alphanumeric':
            default:
                $characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Alphanumeric without confusing chars
                break;
        }

        $couponCode = '';
        $charactersLength = strlen($characters);

        for ($i = 0; $i < $length; $i++) {
            $couponCode .= $characters[rand(0, $charactersLength - 1)];
        }

        // Format code with dashes for better readability if longer than 6 chars
        if ($length > 6) {
            $couponCode = chunk_split($couponCode, 4, '-');
            $couponCode = rtrim($couponCode, '-');
        }

        return $couponCode;
    }
}