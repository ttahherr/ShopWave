      const PRODUCTS = [
        {
          id: 1,
          name: "Zoom Freak 4",
          price: 130,
          category: "best-seller",
          image:"Assets/Zoom Freak 4.webp",
          desc: "Unleash your inner beast.",
        },
        {
          id: 2,
          name: "Air Zoom Pegasus",
          price: 145,
          category: "trendy",
          image:"Assets/Air Zoom Pegasus.webp",
          desc: "Built for the everyday runner.",
        },
        {
          id: 3,
          name: "Court Vision Low",
          price: 95,
          category: "best-seller",
          image:"Assets/Court Vision Low.webp",
          desc: "Classic basketball style.",
        },
        {
          id: 4,
          name: "Metcon 8",
          price: 160,
          category: "trendy",
          image:"Assets/Metcon 8.webp",
          desc: "The gold standard for training.",
        },
        {
          id: 5,
          name: "Legacy 312",
          price: 180,
          category: "best-seller",
          image:"Assets/Legacy 312.webp",
          desc: "A shoutout to the 312 area code.",
        },
        {
          id: 6,
          name: "Vaporfly 3",
          price: 250,
          category: "trendy",
          image:"Assets/Vaporfly 3.webp",
          desc: "Catch them if you can.",
        },
      ];

      const SERVICES = [
        {
          icon: "truck",
          title: "Free Shipping",
          desc: "On all orders over $150",
        },
        {
          icon: "shield-check",
          title: "Authentic Gear",
          desc: "100% Original Products",
        },
        {
          icon: "clock",
          title: "24/7 Support",
          desc: "We are here whenever you need us",
        },
      ];

      // --- APP STATE & LOGIC ---
      const app = {
        cart: [],
        currentView: "home",

        init: function () {
          // Load Cart
          const saved = localStorage.getItem("sportstep_cart");
          if (saved) this.cart = JSON.parse(saved);
          this.updateCartCount();

          // Initial Render
          this.router("home");

          // Initialize Icons
          lucide.createIcons();
        },

        // Navigation Router
        router: function (viewName) {
          // Hide mobile menu if open
          document.getElementById("mobile-menu").classList.add("hidden");

          // Hide navbar on login, show on others
          const nav = document.getElementById("navbar");
          if (viewName === "login") {
            nav.style.display = "none";
          } else {
            nav.style.display = "block";
          }

          this.currentView = viewName;
          const container = document.getElementById("app-content");
          window.scrollTo(0, 0);

          // Update Active Link State
          document.querySelectorAll(".nav-link").forEach((btn) => {
            if (btn.dataset.target === viewName) {
              btn.classList.add("text-lime-400");
              btn.classList.remove("text-gray-300");
            } else {
              btn.classList.remove("text-lime-400");
              btn.classList.add("text-gray-300");
            }
          });

          // Render Views
          switch (viewName) {
            case "home":
              container.innerHTML = this.views.home();
              break;
            case "products":
              container.innerHTML = this.views.products();
              break;
            case "cart":
              container.innerHTML = this.views.cart();
              break;
            case "login":
              container.innerHTML = this.views.login();
              break;
          }

          // Re-init icons after DOM injection
          lucide.createIcons();
        },

        // Scroll Helper for anchors
        scrollToSection: function (id) {
          if (this.currentView !== "home") {
            this.router("home");
            setTimeout(() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        },

        toggleMenu: function () {
          const menu = document.getElementById("mobile-menu");
          menu.classList.toggle("hidden");
        },

        // Cart Logic
        addToCart: function (id) {
          const product = PRODUCTS.find((p) => p.id === id);
          const existing = this.cart.find((item) => item.id === id);

          if (existing) {
            existing.quantity++;
          } else {
            this.cart.push({ ...product, quantity: 1 });
          }

          this.saveCart();
          this.updateCartCount();
          this.showToast();
        },

        removeFromCart: function (id) {
          this.cart = this.cart.filter((item) => item.id !== id);
          this.saveCart();
          this.updateCartCount();
          this.router("cart"); // Re-render
        },

        updateQuantity: function (id, change) {
          const item = this.cart.find((i) => i.id === id);
          if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
              this.removeFromCart(id);
            } else {
              this.saveCart();
              this.updateCartCount();
              this.router("cart"); // Re-render
            }
          }
        },

        saveCart: function () {
          localStorage.setItem("sportstep_cart", JSON.stringify(this.cart));
        },

        updateCartCount: function () {
          const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
          const badge = document.getElementById("cart-badge");

          if (count > 0) {
            badge.innerText = count;
            badge.classList.remove("hidden");
          } else {
            badge.classList.add("hidden");
          }

          // Mobile count
          const mobileCount = document.getElementById("mobile-cart-count");
          if (mobileCount)
            mobileCount.innerText = count > 0 ? `(${count})` : "";
        },

        showToast: function () {
          const toast = document.getElementById("toast");
          toast.classList.remove("translate-y-20", "opacity-0");
          setTimeout(() => {
            toast.classList.add("translate-y-20", "opacity-0");
          }, 2000);
        },

        // Filter Products
        filterProducts: function (category) {
          const grid = document.getElementById("products-grid");
          const filtered =
            category === "all"
              ? PRODUCTS
              : PRODUCTS.filter((p) => p.category === category);

          // Update buttons
          document.querySelectorAll(".filter-btn").forEach((btn) => {
            if (btn.dataset.filter === category) {
              btn.className =
                "filter-btn px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap bg-white text-gray-900";
            } else {
              btn.className =
                "filter-btn px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap bg-gray-800 text-gray-400 hover:bg-gray-700";
            }
          });

          grid.innerHTML = filtered
            .map((p) => this.components.productCard(p))
            .join("");
          lucide.createIcons();
        },

        // View Templates
        views: {
          home: function () {
            const featured = PRODUCTS.slice(0, 3)
              .map((p) => app.components.productCard(p))
              .join("");

            return `
                        <!-- Hero -->
                        <section class="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32">
                            <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
                                <div class="w-full md:w-1/2 z-10 mb-12 md:mb-0">
                                    <h1 class="text-5xl md:text-7xl font-black italic tracking-tight leading-none mb-6">
                                        RUN THE <br />
                                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600">FUTURE.</span>
                                    </h1>
                                    <p class="text-gray-400 text-lg mb-8 max-w-lg">
                                        Experience the next generation of speed. Engineered for elite performance, designed for the relentless.
                                    </p>
                                    <button onclick="app.router('products')" class="bg-lime-500 text-gray-900 px-8 py-4 font-bold uppercase tracking-wider hover:bg-lime-400 transition-colors flex items-center gap-2 rounded-sm inline-flex">
                                        Shop Now <i data-lucide="arrow-right" class="w-5 h-5"></i>
                                    </button>
                                </div>
                                <div class="w-full md:w-1/2 relative h-[400px] flex justify-center items-center">
                                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-500/20 rounded-full blur-3xl"></div>
                                    <div class="relative w-full h-full">
                                        <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400" class="absolute top-0 right-10 w-64 rounded-lg shadow-2xl z-10 opacity-60 transform rotate-12 border-2 border-gray-700">
                                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" class="absolute top-10 right-28 w-64 rounded-lg shadow-2xl z-20 opacity-80 transform -rotate-6 border-2 border-gray-700">
                                        <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400" class="absolute top-20 right-48 w-64 rounded-lg shadow-2xl z-30 transform -rotate-12 border-2 border-lime-400">
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Why Us -->
                        <section id="why-us" class="py-20 bg-gray-950">
                            <div class="max-w-7xl mx-auto px-4">
                                <div class="text-center mb-16">
                                    <h2 class="text-3xl font-bold uppercase tracking-wider mb-2">Why Choose Us?</h2>
                                    <div class="w-20 h-1 bg-lime-500 mx-auto"></div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    ${SERVICES.map(
                                      (s) => `
                                        <div class="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-lime-500/50 transition-all duration-500 hover:-translate-y-2 group">
                                            <div class="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center text-lime-400 mb-6 group-hover:bg-lime-500 group-hover:text-gray-900 transition-colors">
                                                <i data-lucide="${s.icon}" class="w-8 h-8"></i>
                                            </div>
                                            <h3 class="text-xl font-bold mb-3">${s.title}</h3>
                                            <p class="text-gray-400">${s.desc}</p>
                                        </div>
                                    `
                                    ).join("")}
                                </div>
                            </div>
                        </section>

                        <!-- Featured Drops -->
                        <section class="py-20 bg-gray-900 border-t border-gray-800">
                            <div class="max-w-7xl mx-auto px-4">
                                <div class="text-center mb-16">
                                    <h2 class="text-3xl font-bold uppercase tracking-wider mb-2">Featured Drops</h2>
                                    <div class="w-20 h-1 bg-lime-500 mx-auto"></div>
                                    <p class="text-gray-400 mt-4">Check out the latest arrivals hitting the streets.</p>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                    ${featured}
                                </div>
                                <div class="text-center">
                                    <button onclick="app.router('products')" class="bg-transparent border-2 border-lime-500 text-lime-400 px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-lime-500 hover:text-gray-900 transition-colors inline-flex items-center gap-2">
                                        View More <i data-lucide="arrow-right" class="w-5 h-5"></i>
                                    </button>
                                </div>
                            </div>
                        </section>
                    `;
          },

          products: function () {
            return `
                        <div class="bg-gray-950 py-12 mb-12 border-b border-gray-800">
                            <div class="max-w-7xl mx-auto px-4">
                                <h2 class="text-4xl font-black italic uppercase">Our Collection</h2>
                            </div>
                        </div>
                        <div class="max-w-7xl mx-auto px-4 pb-20">
                            <!-- Filters -->
                            <div class="flex gap-4 mb-12 overflow-x-auto pb-4">
                                <button onclick="app.filterProducts('all')" data-filter="all" class="filter-btn px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap bg-white text-gray-900">All Shoes</button>
                                <button onclick="app.filterProducts('best-seller')" data-filter="best-seller" class="filter-btn px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap bg-gray-800 text-gray-400 hover:bg-gray-700">Best Sellers</button>
                                <button onclick="app.filterProducts('trendy')" data-filter="trendy" class="filter-btn px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap bg-gray-800 text-gray-400 hover:bg-gray-700">Trendy</button>
                            </div>
                            <!-- Grid -->
                            <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                ${PRODUCTS.map((p) =>
                                  app.components.productCard(p)
                                ).join("")}
                            </div>
                        </div>
                    `;
          },

          cart: function () {
            const total = app.cart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            if (app.cart.length === 0) {
              return `
                            <div class="min-h-[60vh] flex flex-col items-center justify-center p-4">
                                <i data-lucide="shopping-bag" class="w-16 h-16 text-gray-700 mb-6"></i>
                                <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
                                <button onclick="app.router('products')" class="bg-lime-500 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-lime-400 transition-colors">Start Shopping</button>
                            </div>
                        `;
            }

            return `
                        <div class="max-w-7xl mx-auto px-4 py-12">
                            <h1 class="text-3xl font-black italic uppercase mb-8">Your Cart</h1>
                            <div class="flex flex-col lg:flex-row gap-8">
                                <div class="lg:w-2/3 space-y-4">
                                    ${app.cart
                                      .map(
                                        (item) => `
                                        <div class="bg-gray-800 p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                                            <img src="${item.image}" class="w-24 h-24 object-cover rounded-lg bg-gray-700">
                                            <div class="flex-1">
                                                <h3 class="font-bold text-lg">${item.name}</h3>
                                                <p class="text-lime-400 font-bold">$${item.price}</p>
                                            </div>
                                            <div class="flex items-center gap-3 bg-gray-900 rounded-lg p-1">
                                                <button onclick="app.updateQuantity(${item.id}, -1)" class="p-1 hover:text-lime-400"><i data-lucide="minus" class="w-4 h-4"></i></button>
                                                <span class="font-bold w-4 text-center">${item.quantity}</span>
                                                <button onclick="app.updateQuantity(${item.id}, 1)" class="p-1 hover:text-lime-400"><i data-lucide="plus" class="w-4 h-4"></i></button>
                                            </div>
                                            <button onclick="app.removeFromCart(${item.id})" class="p-2 text-gray-500 hover:text-red-500 transition-colors"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                                        </div>
                                    `
                                      )
                                      .join("")}
                                </div>
                                <div class="lg:w-1/3">
                                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 sticky top-24">
                                        <h3 class="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h3>
                                        <div class="space-y-3 mb-6">
                                            <div class="flex justify-between text-gray-400"><span>Subtotal</span><span>$${total.toFixed(
                                              2
                                            )}</span></div>
                                            <div class="flex justify-between text-gray-400"><span>Shipping</span><span class="text-lime-400">Free</span></div>
                                        </div>
                                        <div class="flex justify-between text-xl font-bold mb-8 pt-4 border-t border-gray-700"><span>Total</span><span>$${total.toFixed(
                                          2
                                        )}</span></div>
                                        <button class="w-full bg-lime-500 text-gray-900 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-lime-400 transition-colors">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
          },

          login: function () {
            return `
                        <div class="flex-1 flex flex-col md:flex-row min-h-screen">
                            <div class="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-gray-900">
                                <div class="w-full max-w-md space-y-8">
                                    <div class="text-center md:text-left">
                                        <h2 class="text-4xl font-black italic mb-2">WELCOME BACK</h2>
                                        <p class="text-gray-400">Enter your details to access your account.</p>
                                    </div>
                                    <form class="space-y-6" onsubmit="event.preventDefault(); app.router('home')">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-400 mb-2">Username</label>
                                            <input type="text" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition-colors" placeholder="runner123">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-400 mb-2">Password</label>
                                            <input type="password" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition-colors" placeholder="••••••••">
                                        </div>
                                        <div class="flex items-center justify-between text-sm">
                                            <a href="#" class="text-gray-400 hover:text-lime-400">Create new account</a>
                                            <a href="#" class="text-gray-400 hover:text-lime-400">Forgot password?</a>
                                        </div>
                                        <button type="submit" class="w-full bg-lime-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-lime-400 transition-all flex items-center justify-center gap-2">
                                            <i data-lucide="log-in" class="w-5 h-5"></i> Login
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 bg-gray-800 relative hidden md:block overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                                <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover opacity-80">
                                <div class="absolute bottom-16 left-16 z-20 max-w-md">
                                    <h3 class="text-3xl font-bold italic mb-4">"The only one who can tell you 'you can't' is you."</h3>
                                    <p class="text-lime-400 font-bold tracking-wider">— NIKE</p>
                                </div>
                            </div>
                        </div>
                    `;
          },
        },

        components: {
          productCard: function (product) {
            let badge = "";
            if (product.category === "best-seller")
              badge =
                '<span class="absolute top-4 left-4 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase">Best Seller</span>';
            if (product.category === "trendy")
              badge =
                '<span class="absolute top-4 left-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Trending</span>';

            return `
                        <div class="bg-gray-800 rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-300 border border-gray-700">
                            <div class="relative h-64 overflow-hidden bg-gray-700">
                                <img src="${product.image}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                                ${badge}
                            </div>
                            <div class="p-6">
                                <div class="flex justify-between items-start mb-2">
                                    <h3 class="text-xl font-bold">${product.name}</h3>
                                    <span class="text-lime-400 font-bold text-lg">$${product.price}</span>
                                </div>
                                <p class="text-gray-400 text-sm mb-6">${product.desc}</p>
                                <button onclick="app.addToCart(${product.id})" class="w-full bg-gray-900 border border-gray-600 text-white py-3 rounded-lg font-bold uppercase text-sm hover:bg-lime-500 hover:text-gray-900 hover:border-lime-500 transition-all duration-300 flex items-center justify-center gap-2">
                                    <i data-lucide="shopping-bag" class="w-4 h-4"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    `;
          },
        },
      };

      // Start Application
      document.addEventListener("DOMContentLoaded", () => {
        app.init();
      });