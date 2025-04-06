<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SiteVisitsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Visits', '15,342')
                ->description('Over the last 30 days')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),
            Stat::make('Unique Visitors', '9,876')
                ->description('Visitors without repeat visits')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),
            Stat::make('Average Time on Site', '3 min 42 sec')
                ->description('Average session duration')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),
            Stat::make('Bounce Rate', '32%')
                ->description('Percentage of users who left the site')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),
            // New stats below
            Stat::make('Pages per Session', '4.2')
                ->description('Average pages viewed per visit')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('info'),
            Stat::make('Returning Visitors', '5,123')
                ->description('Users who came back this month')
                ->descriptionIcon('heroicon-m-arrow-path')
                ->color('success'),
            Stat::make('New Visitors', '4,753')
                ->description('First-time visitors this month')
                ->descriptionIcon('heroicon-m-user-plus')
                ->color('primary'),
            Stat::make('Conversion Rate', '2.8%')
                ->description('Percentage of visitors who made a purchase')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('success'),
            Stat::make('Mobile Traffic', '65%')
                ->description('Traffic from mobile devices')
                ->descriptionIcon('heroicon-m-device-phone-mobile')
                ->color('warning'),
            Stat::make('Top Referrer', 'Google')
                ->description('7,890 visits from organic search')
                ->descriptionIcon('heroicon-m-magnifying-glass')
                ->color('primary'),
            Stat::make('Social Media Traffic', '2,304')
                ->description('Visits from social platforms')
                ->descriptionIcon('heroicon-m-share')
                ->color('info'),
            Stat::make('Peak Day Visits', '720')
                ->description('Highest daily visits on Apr 14')
                ->descriptionIcon('heroicon-m-fire')
                ->color('danger'),
        ];
    }
}