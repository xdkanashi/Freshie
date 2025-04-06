@extends('layouts.app')
@section('title', $item->name)
<link rel="stylesheet" href="{{ asset('css/product.css') }}">

@section('content')

    <div class="max-w-screen-xl mx-auto px-4 pb-4 bg-black text-white">
        <div class="flex flex-col md:flex-row">
            <!-- Product Images Section -->
            <div class="md:w-1/2 mb-6 md:mb-0 flex flex-col">
                <!-- Main Image with slide-up animation -->
                <div class="mb-4">
                    <img src="{{ asset('storage/' . $item->clothesImages->first()->image) }}" alt="{{ $item->name }}"
                        class="w-full object-cover image-slide-up cursor-pointer" id="main-product-image">
                </div>

                <!-- Thumbnail Images -->
                <div class="flex space-x-2">
                    @foreach($item->clothesImages as $image)
                        <div class="border border-gray-700 p-1 w-24 h-24 cursor-pointer thumbnail-image"
                            data-image="{{ asset('storage/' . $image->image) }}">
                            <img src="{{ asset('storage/' . $image->image) }}" alt="{{ $item->name }}"
                                class="w-full h-full object-cover">
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Product Info Section -->
            <div class="md:w-1/2 md:pl-8">
                <!-- Product Title -->
                <h1 class="text-5xl font-bold uppercase mb-2">{{ $item->name }}</h1>

                <!-- Price Section -->
                <div class="mb-4 flex items-center">
                    @if($item->discount > 0)
                        <span class="line-through text-gray-400">${{ number_format($item->price, 2) }} USD</span>
                        <span class="ml-2 text-xl font-bold">${{ number_format($item->price * (1 - $item->discount / 100), 2) }}
                            USD</span>
                        <span class="ml-2 bg-gray-800 text-white px-2 py-1 text-x">-{{ number_format($item->discount) }}%
                            OFF</span>
                    @else
                        <span class="text-xl font-bold">${{ number_format($item->price, 2) }} USD</span>
                    @endif
                </div>

                <p class="text-sm text-gray-400 mb-4">Tax included.</p>

                <!-- Size Selection -->
                <div class="mb-4">
                    <p class="uppercase mb-6">Size</p>
                    <div class="flex flex-wrap gap-4">
                        @foreach(['XS', 'S', 'M', 'L', 'XL'] as $size)
                            <div class="block-cube size-option {{ $item->size == $size ? 'active' : '' }}"
                                data-size="{{ $size }}">
                                <div class="bg-top">
                                    <div class="bg-inner"></div>
                                </div>
                                <div class="bg-right">
                                    <div class="bg-inner"></div>
                                </div>
                                <div class="bg">
                                    <div class="bg-inner"></div>
                                </div>
                                <div class="text w-12 h-10 flex items-center justify-center cursor-pointer">
                                    {{ $size }}
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                <!-- Quantity Selection -->
                <div class="mb-6">
                    <p class="uppercase mb-6">Quantity</p>
                    <div class="flex items-center w-32 gap-4">
                        <div class="block-cube block-input">
                            <button class="w-10 h-10 text-center quantity-btn text" data-action="decrease">-</button>
                            <div class="bg-top">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg-right">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg">
                                <div class="bg-inner"></div>
                            </div>
                        </div>

                        <div class="block-cube block-input">
                            <input type="text" value="1" id="quantity-input" class="w-12 h-10 bg-transparent text-center">
                            <div class="bg-top">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg-right">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg">
                                <div class="bg-inner"></div>
                            </div>
                        </div>

                        <div class="block-cube block-input">
                            <button class="w-10 h-10 text-center quantity-btn text" data-action="increase">+</button>
                            <div class="bg-top">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg-right">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg">
                                <div class="bg-inner"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Size Chart -->
                <div class="mb-4">
                    <button class="uppercase text-sm underline font-bold" id="size-chart-btn">Size Chart</button>
                </div>

                <!-- Shipping Info -->
                <div class="mb-4">
                    <p class="flex items-center text-green-500 text-sm">
                        <span class="w-3 h-3 rounded-full bg-green-500 mr-2 pulse-dot"></span>
                        Shipping in 2-5 business days
                    </p>
                </div>

                <!-- Stock Info -->
                <div class="mb-6">
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                    <p class="text-sm stock-indicator text">
                        Currently
                        {{ $item->is_sold_out ? 'Sold Out' : ($item->pre_order ? 'Available for Pre-Order' : '') }}
                    </p>
                </div>

                <!-- Add to Cart Button -->
                <div class="mb-6">
                    <div class="block-cube block-cube-hover">
                        <button class="w-full py-3 uppercase font-bold text" id="add-to-cart-btn"
                            data-clothe-id="{{ $item->id }}"
                            data-image="{{ asset('storage/' . $item->clothesImages->first()->image) }}"
                            data-name="{{ $item->name }}">Add to Cart</button>
                        <div class="bg-top">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg-right">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg">
                            <div class="bg-inner"></div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex justify-between mb-6">
                    <div class="block-cube block-cube-hover">
                        <button class="nav-button text {{ $prevProduct ? '' : 'disabled' }}" id="prev-btn"
                            data-product-id="{{ $prevProduct?->id ?? '' }}">
                            < Previous </button>
                                <div class="bg-top">
                                    <div class="bg-inner"></div>
                                </div>
                                <div class="bg-right">
                                    <div class="bg-inner"></div>
                                </div>
                                <div class="bg">
                                    <div class="bg-inner"></div>
                                </div>
                    </div>

                    <div class="block-cube block-cube-hover">
                        <button class="nav-button text {{ $nextProduct ? '' : 'disabled' }}" id="next-btn"
                            data-product-id="{{ $nextProduct?->id ?? '' }}">
                            Next >
                        </button>
                        <div class="bg-top">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg-right">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg">
                            <div class="bg-inner"></div>
                        </div>
                    </div>
                </div>

                <!-- Description Section (Collapsible) -->
                <div class="mb-4 border-t border-gray-800 pt-4">
                    <div class="flex justify-between items-center cursor-pointer toggle-section" data-target="description">
                        <h3 class="uppercase font-bold">Description</h3>
                        <span class="text-xl toggle-icon">-</span>
                    </div>
                    <div class="mt-4 description-content active" id="description">
                        <p class="text-sm">
                            - 100% COTTON FLEECE<br>
                            - COMFY BOXY FIT<br>
                            <strong>Note:</strong> Each merch is personalized with the user's username and game points. The
                            image shown in the product card is an example only.<br>
                            <br>{{ $item->description }}
                        </p>
                    </div>
                </div>

                <!-- Sizing Section (Collapsible) -->
                <div class="mb-4 border-t border-gray-800 pt-4">
                    <div class="flex justify-between items-center cursor-pointer toggle-section" data-target="sizing">
                        <h3 class="uppercase font-bold">Sizing</h3>
                        <span class="text-xl toggle-icon">+</span>
                    </div>
                    <div class="mt-4 description-content" id="sizing">
                        <p class="text-sm">
                            Our items typically run true to size. For a more relaxed fit, we recommend sizing up.
                        </p>
                    </div>
                </div>

                <!-- Shipping Information (Collapsible) -->
                <div class="mb-4 border-t border-gray-800 pt-4">
                    <div class="flex justify-between items-center cursor-pointer toggle-section" data-target="shipping">
                        <h3 class="uppercase font-bold">Shipping Information</h3>
                        <span class="text-xl toggle-icon">+</span>
                    </div>
                    <div class="mt-4 description-content" id="shipping">
                        <p class="text-sm">
                            All orders are processed within 1-2 business days. Shipping takes 2-5 business days depending on
                            your location. International shipping is available for an additional fee.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Size Chart Modal -->
    <div class="size-chart-modal" id="size-chart-modal">
        <div class="size-chart-container">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold uppercase">Size Chart</h3>
                <button class="text-xl" id="close-size-chart">×</button>
            </div>
            <table class="w-full border-collapse text-sm">
                <thead>
                    <tr class="border-b border-gray-700">
                        <th class="py-2 text-left">Size</th>
                        <th class="py-2 text-center">US</th>
                        <th class="py-2 text-center">EU</th>
                        <th class="py-2 text-center">UK</th>
                        <th class="py-2 text-center">Chest (in)</th>
                        <th class="py-2 text-center">Length (in)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b border-gray-700">
                        <td class="py-2">XS</td>
                        <td class="py-2 text-center">XS</td>
                        <td class="py-2 text-center">42</td>
                        <td class="py-2 text-center">32</td>
                        <td class="py-2 text-center">34-36</td>
                        <td class="py-2 text-center">26</td>
                    </tr>
                    <tr class="border-b border-gray-700">
                        <td class="py-2">S</td>
                        <td class="py-2 text-center">S</td>
                        <td class="py-2 text-center">44-46</td>
                        <td class="py-2 text-center">34-36</td>
                        <td class="py-2 text-center">36-38</td>
                        <td class="py-2 text-center">27</td>
                    </tr>
                    <tr class="border-b border-gray-700">
                        <td class="py-2">M</td>
                        <td class="py-2 text-center">M</td>
                        <td class="py-2 text-center">48-50</td>
                        <td class="py-2 text-center">38-40</td>
                        <td class="py-2 text-center">38-40</td>
                        <td class="py-2 text-center">28</td>
                    </tr>
                    <tr class="border-b border-gray-700">
                        <td class="py-2">L</td>
                        <td class="py-2 text-center">L</td>
                        <td class="py-2 text-center">52-54</td>
                        <td class="py-2 text-center">42-44</td>
                        <td class="py-2 text-center">40-42</td>
                        <td class="py-2 text-center">29</td>
                    </tr>
                    <tr>
                        <td class="py-2">XL</td>
                        <td class="py-2 text-center">XL</td>
                        <td class="py-2 text-center">56</td>
                        <td class="py-2 text-center">46</td>
                        <td class="py-2 text-center">42-44</td>
                        <td class="py-2 text-center">30</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Product Gallery Modal -->
    <div class="gallery-modal" id="gallery-modal">
        <div class="gallery-container">
            <img src="" alt="Product view" class="gallery-image" id="gallery-current-image">
            <div class="gallery-nav gallery-prev">❮</div>
            <div class="gallery-nav gallery-next">❯</div>
            <div class="gallery-close">×</div>
            <div class="gallery-counter">1 / 3</div>
            <div class="zoom-controls">
                <div class="zoom-button zoom-in">+</div>
                <div class="zoom-button zoom-out">−</div>
            </div>
        </div>
    </div>

    <!-- Notification Modal -->
    <div class="fixed inset-0 flex items-center justify-center z-50 hidden opacity-0 transition-opacity duration-300"
        id="notification-modal">
        <div class="bg-black border border-gray-700 shadow-lg rounded-lg p-6 w-full max-w-md relative">
            <button class="absolute top-2 right-2 text-white text-2xl" id="close-notification">×</button>
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-4">
                    <img src="" alt="Product Image" id="notification-product-image" class="w-16 h-16 object-cover rounded">
                    <div class="flex-1">
                        <p class="text-white font-bold text-lg" id="notification-product-name"></p>
                        <p class="text-gray-400 text-sm" id="notification-message"></p>
                    </div>
                </div>
                <!-- Кнопки отображаются только для успешных уведомлений и залогиненных пользователей -->
                <div id="notification-buttons" class="flex gap-4 mt-4 hidden">
                    @auth
                        <button id="continue-shopping"
                            class="flex-1 bg-gray-700 text-white py-2 rounded uppercase text-sm hover:bg-gray-600 transition">
                            Continue Shopping
                        </button>
                        <button id="checkout"
                            class="flex-1 bg-gray-700 text-white py-2 rounded uppercase text-sm hover:bg-gray-600 transition">
                            Checkout
                        </button>
                    @endauth
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Toggle sections (Description, Sizing, Shipping) with faster animations
            const toggleButtons = document.querySelectorAll('.toggle-section');
            toggleButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const targetId = this.getAttribute('data-target');
                    const contentDiv = document.getElementById(targetId);
                    const icon = this.querySelector('.toggle-icon');

                    if (contentDiv.classList.contains('active')) {
                        icon.textContent = '+';
                        contentDiv.style.opacity = '0';
                        setTimeout(() => {
                            contentDiv.classList.remove('active');
                        }, 150); // Faster closing transition
                    } else {
                        contentDiv.classList.add('active');
                        setTimeout(() => {
                            contentDiv.style.opacity = '1';
                        }, 10);
                        icon.textContent = '-';
                    }
                });
            });

            // Size Chart Modal
            const sizeChartBtn = document.getElementById('size-chart-btn');
            const sizeChartModal = document.getElementById('size-chart-modal');
            const closeModal = document.getElementById('close-size-chart');

            sizeChartBtn.addEventListener('click', function () {
                sizeChartModal.style.display = 'flex';
                setTimeout(() => {
                    sizeChartModal.classList.add('active');
                }, 10);
            });

            closeModal.addEventListener('click', function () {
                sizeChartModal.classList.remove('active');
                setTimeout(() => {
                    sizeChartModal.style.display = 'none';
                }, 300);
            });

            sizeChartModal.addEventListener('click', function (e) {
                if (e.target === sizeChartModal) {
                    sizeChartModal.classList.remove('active');
                    setTimeout(() => {
                        sizeChartModal.style.display = 'none';
                    }, 300);
                }
            });

            // Size Selection
            const sizeOptions = document.querySelectorAll('.size-option');
            let selectedSize = document.querySelector('.size-option.active')?.getAttribute('data-size') || null;

            sizeOptions.forEach(option => {
                option.addEventListener('click', function () {
                    sizeOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    selectedSize = this.getAttribute('data-size');
                    console.log('Selected size:', selectedSize);
                });
            });

            // Quantity Adjustment
            const quantityInput = document.getElementById('quantity-input');
            const quantityBtns = document.querySelectorAll('.quantity-btn');

            quantityBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    const action = this.getAttribute('data-action');
                    let currentQuantity = parseInt(quantityInput.value);

                    if (action === 'increase') {
                        currentQuantity += 1;
                    } else if (action === 'decrease' && currentQuantity > 1) {
                        currentQuantity -= 1;
                    }

                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    setTimeout(() => {
                        this.style.backgroundColor = 'transparent';
                    }, 150);

                    quantityInput.value = currentQuantity;
                });
            });

            quantityInput.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value === '' || parseInt(this.value) < 1) {
                    this.value = '1';
                }
            });

            // Thumbnail Image Selection
            const thumbnails = document.querySelectorAll('.thumbnail-image');
            const mainImage = document.querySelector('.image-slide-up');

            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function () {
                    const imageSrc = this.getAttribute('data-image');
                    mainImage.style.opacity = '0';
                    mainImage.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        mainImage.src = imageSrc;
                        setTimeout(() => {
                            mainImage.style.opacity = '1';
                            mainImage.style.transform = 'translateY(0)';
                        }, 50);
                    }, 200);
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Navigation buttons
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            prevBtn.addEventListener('click', function () {
                if (this.classList.contains('disabled')) return;
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
                const prevProductId = this.getAttribute('data-product-id');
                if (prevProductId) {
                    window.location.href = '/product/' + prevProductId;
                }
            });

            nextBtn.addEventListener('click', function () {
                if (this.classList.contains('disabled')) return;
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
                const nextProductId = this.getAttribute('data-product-id');
                if (nextProductId) {
                    window.location.href = '/product/' + nextProductId;
                }
            });

            // Add to Cart Functionality
            const addToCartBtn = document.getElementById('add-to-cart-btn');
            const notificationModal = document.getElementById('notification-modal');
            const notificationProductImage = document.getElementById('notification-product-image');
            const notificationProductName = document.getElementById('notification-product-name');
            const notificationMessage = document.getElementById('notification-message');
            const notificationButtons = document.getElementById('notification-buttons');
            const closeNotification = document.getElementById('close-notification');
            const continueShoppingBtn = document.getElementById('continue-shopping');
            const checkoutBtn = document.getElementById('checkout');

            function showNotification(message, isSuccess = true, productImage = '', productName = '') {
                // Очищаем предыдущие таймеры, чтобы избежать наложения
                if (notificationModal.timeout) {
                    clearTimeout(notificationModal.timeout);
                }

                if (isSuccess) {
                    // Успешное уведомление: показываем изображение и название продукта
                    notificationProductImage.src = productImage;
                    notificationProductName.textContent = productName;
                    notificationMessage.textContent = 'has been added to your cart!';
                    notificationProductImage.classList.remove('hidden');
                    notificationProductName.classList.remove('hidden');
                    // Показываем кнопки только для залогиненных пользователей
                    if (continueShoppingBtn && checkoutBtn) {
                        notificationButtons.classList.remove('hidden');
                    } else {
                        // Для незалогиненных пользователей уведомление исчезает через 3 секунд
                        notificationButtons.classList.add('hidden');
                        notificationModal.timeout = setTimeout(() => {
                            notificationModal.classList.remove('opacity-100');
                            setTimeout(() => {
                                notificationModal.classList.add('hidden');
                            }, 300);
                        }, 3000);
                    }
                } else {
                    // Сообщение об ошибке: скрываем изображение и название, показываем только сообщение
                    notificationProductImage.classList.add('hidden');
                    notificationProductName.classList.add('hidden');
                    notificationMessage.textContent = message;
                    notificationButtons.classList.add('hidden'); // Скрываем кнопки для всех пользователей
                    // Уведомление об ошибке исчезает через 3 секунд
                    notificationModal.timeout = setTimeout(() => {
                        notificationModal.classList.remove('opacity-100');
                        setTimeout(() => {
                            notificationModal.classList.add('hidden');
                        }, 300);
                    }, 3000);
                }

                notificationModal.classList.remove('hidden');
                setTimeout(() => {
                    notificationModal.classList.add('opacity-100');
                }, 10);
            }

            closeNotification.addEventListener('click', () => {
                if (notificationModal.timeout) {
                    clearTimeout(notificationModal.timeout);
                }
                notificationModal.classList.remove('opacity-100');
                setTimeout(() => {
                    notificationModal.classList.add('hidden');
                }, 300);
            });

            if (continueShoppingBtn) {
                continueShoppingBtn.addEventListener('click', () => {
                    if (notificationModal.timeout) {
                        clearTimeout(notificationModal.timeout);
                    }
                    notificationModal.classList.remove('opacity-100');
                    setTimeout(() => {
                        notificationModal.classList.add('hidden');
                    }, 300);
                });
            }

            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    if (notificationModal.timeout) {
                        clearTimeout(notificationModal.timeout);
                    }
                    notificationModal.classList.remove('opacity-100');
                    setTimeout(() => {
                        notificationModal.classList.add('hidden');
                        window.location.href = '/checkout';
                    }, 300);
                });
            }

            addToCartBtn.addEventListener('click', function () {
                if (!selectedSize) {
                    showNotification('Please select a size!', false);
                    return;
                }

                const clotheId = this.getAttribute('data-clothe-id');
                const quantity = parseInt(quantityInput.value);
                const productImage = this.getAttribute('data-image');
                const productName = this.getAttribute('data-name');

                fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({
                        clothe_id: clotheId,
                        size: selectedSize,
                        quantity: quantity
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showNotification('Item added to cart successfully!', true, productImage, productName);
                            // Обновляем бейдж после успешного добавления
                            if (typeof window.updateCartBadge === 'function') {
                                window.updateCartBadge();
                            }
                        } else {
                            showNotification('Error: ' + data.message, false);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showNotification('An error occurred while adding the item to the cart.', false);
                    });
            });

            // Product Gallery Modal
            const mainProductImage = document.getElementById('main-product-image');
            const galleryModal = document.getElementById('gallery-modal');
            const galleryCurrentImage = document.getElementById('gallery-current-image');
            const galleryClose = document.querySelector('.gallery-close');
            const galleryPrev = document.querySelector('.gallery-prev');
            const galleryNext = document.querySelector('.gallery-next');
            const galleryCounter = document.querySelector('.gallery-counter');
            const zoomIn = document.querySelector('.zoom-in');
            const zoomOut = document.querySelector('.zoom-out');

            const productImages = Array.from(thumbnails).map(thumb => thumb.getAttribute('data-image'));
            let currentImageIndex = 0;
            let currentZoomLevel = 1;

            // Open gallery modal
            mainProductImage.addEventListener('click', function () {
                currentImageIndex = 0;
                galleryCurrentImage.src = productImages[currentImageIndex];
                updateGalleryCounter();
                resetZoom();
                galleryModal.style.display = 'flex';
                setTimeout(() => {
                    galleryModal.classList.add('active');
                }, 10);
            });

            // Close gallery modal
            galleryClose.addEventListener('click', function () {
                galleryModal.classList.remove('active');
                setTimeout(() => {
                    galleryModal.style.display = 'none';
                }, 300);
            });

            galleryModal.addEventListener('click', function (e) {
                if (e.target === galleryModal) {
                    galleryModal.classList.remove('active');
                    setTimeout(() => {
                        galleryModal.style.display = 'none';
                    }, 300);
                }
            });

            // Navigate to previous image
            galleryPrev.addEventListener('click', function () {
                currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
                galleryCurrentImage.src = productImages[currentImageIndex];
                updateGalleryCounter();
                resetZoom();
            });

            // Navigate to next image
            galleryNext.addEventListener('click', function () {
                currentImageIndex = (currentImageIndex + 1) % productImages.length;
                galleryCurrentImage.src = productImages[currentImageIndex];
                updateGalleryCounter();
                resetZoom();
            });

            // Swipe support for mobile devices
            let touchStartX = 0;
            let touchEndX = 0;

            galleryCurrentImage.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            galleryCurrentImage.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50; // Minimum distance for swipe
                if (touchStartX - touchEndX > swipeThreshold) {
                    // Swipe left -> next image
                    galleryNext.click();
                }
                if (touchEndX - touchStartX > swipeThreshold) {
                    // Swipe right -> previous image
                    galleryPrev.click();
                }
            }

            // Update gallery counter
            function updateGalleryCounter() {
                galleryCounter.textContent = `${currentImageIndex + 1} / ${productImages.length}`;
            }

            // Zoom functionality
            zoomIn.addEventListener('click', function () {
                if (currentZoomLevel < 3) {
                    currentZoomLevel += 0.25;
                    applyZoom();
                }
            });

            zoomOut.addEventListener('click', function () {
                if (currentZoomLevel > 0.5) {
                    currentZoomLevel -= 0.25;
                    applyZoom();
                }
            });

            function applyZoom() {
                galleryCurrentImage.style.transform = `scale(${currentZoomLevel})`;
            }

            function resetZoom() {
                currentZoomLevel = 1;
                galleryCurrentImage.style.transform = 'scale(1)';
            }

            // Keyboard navigation for gallery
            document.addEventListener('keydown', function (e) {
                if (!galleryModal.classList.contains('active')) return;

                if (e.key === 'ArrowLeft') {
                    galleryPrev.click();
                } else if (e.key === 'ArrowRight') {
                    galleryNext.click();
                } else if (e.key === 'Escape') {
                    galleryClose.click();
                } else if (e.key === '+') {
                    zoomIn.click();
                } else if (e.key === '-') {
                    zoomOut.click();
                }
            });
        });
    </script>

@endsection