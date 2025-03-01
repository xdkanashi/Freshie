<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function collections()
    {
        return view('collections');
    }

    public function contact()
    {
        return view('contact');
    }

    public function lookbook()
    {
        return view('lookbook');
    }

    public function return()
    {
        return view('return-policy');
    }

    public function refund()
    {
        return view('refund-policy');
    }

    public function terms()
    {
        return view('terms-of-service');
    }

    public function privacy()
    {
        return view('privacy-policy');
    }

    public function preorder()
    {
        return view('pre-order-status');
    }
}