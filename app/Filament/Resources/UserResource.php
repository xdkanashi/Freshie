<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DateTimePicker;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationLabel = 'Users';

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Administration';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('username')
                    ->label('Username')
                    ->required()
                    ->maxLength(50),

                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->unique(User::class, 'email', ignoreRecord: true),

                // Пароль
                TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->dehydrateStateUsing(fn($state) => !empty($state) ? Hash::make($state) : null)
                    ->required(fn($livewire) => $livewire instanceof Pages\CreateUser)
                    ->dehydrated(fn($state) => filled($state))
                    ->maxLength(255),

                // Интервал игры в часах
                TextInput::make('game_interval_hours')
                    ->label('Game Interval (hours)')
                    ->default(24) // По умолчанию 24 часа
                    ->numeric()  // Это сделает поле доступным только для чисел
                    ->helperText('Set the interval (in hours) for when the user can play the game again.')
                    ->rules('required|integer|min:1|max:48'), // Используем правила валидации Laravel

                // Описание Toggle для Admin
                Toggle::make('is_admin')
                    ->label('Admin')
                    ->default(false)
                    ->helperText('Indicates whether the user has admin privileges.'),

                // Управление лимитом игры
                Toggle::make('game_limit_enabled')
                    ->label('Game Limit Enabled')
                    ->default(true) // По умолчанию включен лимит
                    ->helperText('Enable or disable the game limit for this user.')
                    ->required(),

                // Время последней игры (теперь выводится как текстовое поле, только для чтения)
                TextInput::make('last_game_played_at')
                    ->label('Last Game Played At')
                    ->disabled()  // Поле только для чтения
                    ->helperText('The time when the user last played the game. This is automatically updated after each game.'),

                // Время следующей игры (теперь выводится как текстовое поле, только для чтения)
                TextInput::make('next_game_time')
                    ->label('Next Game Time')
                    ->disabled()  // Запрещаем редактирование
                    ->helperText(function ($component) {
                        $user = $component->getState();

                        // Проверяем, существует ли свойство 'next_game_time' у пользователя
                        if (isset($user->next_game_time)) {
                            $nextGameTime = $user->next_game_time;
                            $now = now();

                            // Преобразуем строку в объект Carbon
                            $nextGameTime = Carbon::parse($nextGameTime);

                            // Если time_next_game меньше или равно текущему времени
                            if ($nextGameTime <= $now) {
                                return '<span class="inline-flex items-center px-2 py-1 font-semibold leading-5 text-green-800 bg-green-100 rounded-full">✔️ Ready to play</span>';
                            }

                            // Если время еще не пришло, показываем сколько осталось
                            $remaining = $nextGameTime->diff($now)->format('%H:%I:%S');
                            return "{$remaining} remaining";
                        }

                        return 'This field displays the time when the user can play the game again, based on the game limit settings.';
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('username')->label('Username')->sortable()->searchable(),
                TextColumn::make('email')->label('Email')->sortable()->searchable(),
                TextColumn::make('is_admin')
                    ->label('Admin')
                    ->sortable()
                    ->formatStateUsing(fn($state) => $state ? 'Yes' : 'No')
                    ->badge()
                    ->color(fn($state) => $state ? 'success' : 'danger'),
                TextColumn::make('game_limit_enabled')
                    ->label('Game Limit Enabled')
                    ->formatStateUsing(fn($state) => $state ? 'Yes' : 'No')
                    ->badge()
                    ->color(fn($state) => $state ? 'success' : 'danger'),
                // Отображение времени до следующей игры
                TextColumn::make('next_game_time')
                    ->label('Next Game Time')
                    ->sortable()
                    ->formatStateUsing(function ($state, $record) {
                        if (isset($state)) {
                            $now = now();

                            // Преобразуем строку в объект Carbon
                            $nextGameTime = Carbon::parse($state);

                            if ($nextGameTime <= $now) {
                                return '<span class="inline-flex items-center px-2 py-1 text-s font-semibold leading-5 text-green-800 bg-green-100 rounded-full">✔️ Ready to play</span>';
                            }

                            $remaining = $nextGameTime->diff($now)->format('%H:%I:%S');
                            return "{$remaining} remaining";
                        }
                        return 'No limit';
                    })
                    ->html(), // Чтобы выводить HTML
                TextColumn::make('created_at')->label('Created At')->dateTime(),
            ])
            ->filters([/* Add filters here if needed */])
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
