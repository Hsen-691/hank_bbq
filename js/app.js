// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();

// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();



// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();


// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();

// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();



// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();



// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();

// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();



// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();



// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();

// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();



// /* Customer facing shop */
// const state = {
//   user: null,
//   categories: [],
//   products: [],
//   branches: [],
//   branchId: null,        // the branch the order's WhatsApp goes to
//   activeCategory: "all",
//   view: "cats",          // "cats" = the category grid, "items" = category strip + products
//   search: "",
//   cart: { items: [], total: 0, item_count: 0 },
//   pendingAction: null,   // something to finish after the customer logs in
//   opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
//   sheet: null,           // the item page that is open
//   authMode: "login",
//   ordersTimer: null,
// };

// /* ---------- helpers ---------- */
// function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
// function closeAll() {
//   $("#overlay").classList.remove("open");
//   $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
//   clearInterval(state.ordersTimer);
// }
// function qtyInCart(productId) {
//   const line = state.cart.items.find((i) => i.product_id === productId);
//   return line ? line.quantity : 0;
// }
// // A real photo when one was uploaded, otherwise a quiet neutral placeholder.
// const thumb = (url, name) =>
//   url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
// const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

// /* ---------- language ----------
//    Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
//    and are filled from this dictionary. JS-built strings read it through T(). */
// const I18N = {
//   en: {
//     all: "All", add: "Add", options: "Choose options", search: "Search the menu",
//     categories: "Categories", item: "item", items: "items",
//     emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
//     navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
//     heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
//     ordernow: "Order now", offers: "See today's offers",
//     aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
//     aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
//     aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
//     aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
//     signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
//     cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
//     cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
//     addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
//     tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
//     flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
//     loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
//     signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
//     passPhNew: "Create a password", passPhLogin: "Enter your password",
//     authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
//     coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
//     modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
//     pickupHint: "Pickup is free. We will have it ready for you at the counter.",
//     notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
//     chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
//     back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
//     deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
//     yourNotes: "Your notes", noNotes: "No notes",
//     contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
//     noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
//     trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
//     st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
//     tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
//     tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
//     branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
//   },
//   ar: {
//     all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
//     categories: "الأصناف", item: "صنف", items: "أصناف",
//     emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
//     navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
//     heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
//     ordernow: "اطلب الآن", offers: "عروض اليوم",
//     aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
//     aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
//     aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
//     aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
//     signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
//     cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
//     cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
//     addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
//     tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
//     flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
//     loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
//     signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
//     passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
//     authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
//     coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
//     modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
//     pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
//     notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
//     chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
//     back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
//     deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
//     yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
//     contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
//     noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
//     trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
//     st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
//     tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
//     tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
//     branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
//   },
// };
// const T = () => I18N[Lang.current];

// function updateLangBtn() {
//   const b = $("#langBtn");
//   if (!b) return;
//   b.textContent = Lang.isAr ? "EN" : "ع";
//   b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
// }
// function applyI18n() {
//   const t = T();
//   $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
//   $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
//   $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
//   document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
//   updateLangBtn();
// }
// async function setLang(v) {
//   Lang.current = v;
//   applyDir();
//   applyI18n();
//   if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
//   if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// }

// /* ---------- branches (where the order's WhatsApp goes) ---------- */
// async function loadBranches() {
//   try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
//   if (!state.branches.length) return;
//   let saved = null;
//   try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
//   state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
//   if (!state.lastBranchId) saved = state.branches[0].id;
//   state.branchId = saved;
//   try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
//   renderIntroBranches();
// }
// function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

// // The branch chooser shown on the opening screen, one box per branch.
// function renderIntroBranches() {
//   const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
//   if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
//   if (!state.branches.length) return;
//   const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
//   const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
//   const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
//   grid.innerHTML = state.branches.map((b, i) =>
//     `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
//       <span class="ibc-clip" aria-hidden="true"></span>
//       <span class="ibc-swing"><span class="ibc-paper">
//         ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
//         <span class="ibc-main">
//           <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
//           <span class="ibc-name">${esc(b.name)}</span>
//           <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
//         </span>
//         <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
//       </span></span>
//     </button>`).join("");
//   intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
//   box.classList.remove("hidden");
// }
// // Picking a branch docket stores the choice, tears its stub off, then enters the site.
// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".intro-branch-card");
//   if (!card || card.classList.contains("torn")) return;
//   state.branchId = card.dataset.branch;
//   try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
//   const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
//   const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
//   const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
//   if (reduce) { enter(); return; }
//   card.classList.add("torn");
//   setTimeout(enter, 380);
// });

// /* Build the order message that is sent to the branch on WhatsApp. */
// function waMessage(branch) {
//   const ar = Lang.isAr;
//   const lines = [];
//   lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
//   lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
//   if (state.user) {
//     lines.push((ar ? "الاسم: " : "Name: ") + displayName(state.user));
//     if (state.user.phone_number) lines.push((ar ? "الهاتف: " : "Phone: ") + state.user.phone_number);
//   }
//   lines.push("————");
//   for (const i of state.cart.items) {
//     let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
//     const ch = lineChoices(i.product_id);
//     if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
//     lines.push(line);
//   }
//   lines.push("————");
//   lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
//                   : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
//   const note = $("#cNotes").value.trim();
//   if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
//   return lines.join("\n");
// }

// /* ---------- menu ---------- */
// async function loadMenu() {
//   $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
//   try {
//     const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
//     state.categories = cats;
//     state.products = prods;
//   } catch (e) {
//     $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
//     return;
//   }
//   const offers = state.categories.find(isOfferCategory);
//   $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
//   renderCategories();
//   renderMenu();
// }

// /* ---------- menu views ----------
//    Menu mode hides the home sections (hero, about) and shows the menu.
//    Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
// function setView(v) {
//   state.view = v;
//   document.body.classList.toggle("view-cats", v === "cats");
//   document.body.classList.toggle("view-items", v === "items");
// }
// function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
// function enterMenu() {              // the Menu link / Order now: always start on the category grid
//   state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
//   state.activeCategory = "all";
//   setMenuMode(true); setView("cats");
//   renderCategories(); renderMenu();
// }
// function leaveMenu() {              // back to the home page: the category grid stays visible below About
//   setMenuMode(false); setView("cats"); state.activeCategory = "all";
//   renderCategories(); renderMenu();
// }
// function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
//   state.activeCategory = id;
//   if (!stay) setMenuMode(true);
//   setView("items");
//   renderCategories(); renderMenu();
// }

// function renderCategories() {
//   const counts = {};
//   state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
//   const used = state.categories.filter((c) => counts[c.id]);

//   const tile = (c) => {
//     const n = counts[c.id];
//     const has = !!c.image_url;
//     return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
//       <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
//       <span class="ctile-lbl">${esc(c.name)}</span></button>`;
//   };
//   const html = used.map(tile).join("");
//   $("#tiles").innerHTML = html;   // big grid (Menu page)
//   $("#cats").innerHTML = html;    // strip above the products
//   $("#browse").classList.toggle("hidden", used.length === 0);

//   const act = $("#cats .active");  // keep the chosen category in view inside the strip
//   if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
// }

// function productCard(p, instant = false) {
//   const q = qtyInCart(p.id);
//   const action = q
//     ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
//     : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
//   let tag = "", old = "";
//   if (p.old_price && p.old_price > p.price) {
//     const off = Math.round((1 - p.price / p.old_price) * 100);
//     tag = `<span class="tag">Save ${off}%</span>`;
//     old = `<s>${money(p.old_price)}</s>`;
//   }
//   return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
//     <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
//     <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
//       <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
//   </article>`;
// }

// let lastMenuKey = "";
// function renderMenu() {
//   // Cart changes re-render the cards; only animate them when the visible set really changes.
//   const key = state.activeCategory + "|" + state.products.length;
//   const instant = key === lastMenuKey;
//   lastMenuKey = key;

//   const term = state.search.trim().toLowerCase();
//   if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
//   let list = state.products;
//   if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
//   if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

//   if (!list.length) {
//     $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
//     return;
//   }
//   if (state.activeCategory === "all" && !term) {
//     let html = "";
//     const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
//     for (const c of state.categories) {
//       const items = list.filter((p) => p.category_id === c.id);
//       if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
//     }
//     const orphans = list.filter((p) => !p.category_id);
//     if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
//     $("#menu").innerHTML = html;
//   } else {
//     $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
//   }
// }

// /* ---------- cart ---------- */
// async function loadCart() {
//   if (!Auth.token) { state.cart = { items: [], total: 0, item_count: 0 }; renderCart(); return; }
//   try { state.cart = await api("/cart"); } catch { /* session expiry is handled elsewhere */ }
//   renderCart();
// }

// /* ---------- choices per cart item (spicy, no onions...) ----------
//    The server cart only knows items and quantities, so the choices live here, per item,
//    and travel to the kitchen inside the order notes. */
// const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
// function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
// function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
// function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
// function reconcileOpts() {          // keep our notes in step with what the server cart really holds
//   const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
//   for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
//   for (const [id, q] of inCart) {
//     const list = state.opts[id] || (state.opts[id] = []);
//     let sum = list.reduce((a, e) => a + e.qty, 0);
//     if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
//     while (sum > q && list.length) {
//       const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
//       last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
//     }
//   }
//   saveOpts();
// }
// function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
//   const list = state.opts[id] || (state.opts[id] = []);
//   if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
//   else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
// }
// function noteRemove(id) {
//   const list = state.opts[id]; if (!list || !list.length) return;
//   list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
// }
// function lineChoices(id) {          // what to show under the item name in the cart
//   const list = state.opts[id] || [];
//   const withText = list.filter((e) => e.text);
//   if (!withText.length) return "";
//   return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
// }
// function orderNotes() {             // the kitchen reads this on the order
//   const lines = [];
//   for (const i of state.cart.items) {
//     const list = (state.opts[i.product_id] || []).filter((e) => e.text);
//     if (!list.length) continue;
//     lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
//   }
//   const own = $("#cNotes").value.trim();
//   /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
//   return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
// }

// function renderCart() {
//   reconcileOpts();
//   const n = state.cart.item_count || 0;
//   const badge = $("#cartCount");
//   const grew = n > Number(badge.textContent || 0);
//   badge.textContent = n;
//   if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
//   $("#cartTotal").textContent = money(state.cart.total);
//   const list = $("#cartList");
//   if (!state.cart.items.length) {
//     list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
//     $("#cartFoot").classList.add("hidden");
//   } else {
//     $("#cartFoot").classList.remove("hidden");
//     list.innerHTML = state.cart.items.map((i) => `
//       <div class="line">
//         <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
//         <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
//         <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
//         <b>${money(i.sub_total)}</b>
//       </div>`).join("");
//   }
//   renderMenu(); // refresh the +/- steppers on the cards
// }

// async function addToCart(productId, quantity = 1, note = null) {
//   if (!Auth.token) { state.pendingAction = () => addToCart(productId, quantity, note); showAuth("login"); return false; }
//   try {
//     state.cart = await api("/cart/items", { method: "POST", body: { product_id: productId, quantity } });
//     noteAdd(productId, quantity, note);
//     renderCart();
//     return true;
//   } catch (e) { toast(e.message, "error"); return false; }
// }
// async function removeOne(productId) {
//   try { state.cart = await api(`/cart/items/${productId}?quantity=1`, { method: "DELETE" }); noteRemove(productId); renderCart(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- item page: photo, choices, add to cart ---------- */
// function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
// function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
//   const n = name.trim().toLowerCase();
//   return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
// }
// function groupsFor(p) {
//   const cat = categoryName(p);
//   const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
//   if (!rule) return [];
//   return rule.groups.map((g) => ({
//     ...g,
//     choices: g.choices.map((c) => {
//       if (!c.item) return { label: c.label, product: null, price: 0 };
//       const it = findItem(c.item);
//       return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
//     }).filter(Boolean),
//   })).filter((g) => g.choices.length);
// }

// function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
//   return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
// }
// function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
// function sheetUnit() {
//   const sh = state.sheet; const picks = sheetPicks();
//   let unit = sh.product.price;
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
//   return unit;
// }
// function updateSheetTotal() {
//   const sh = state.sheet; if (!sh) return;
//   $("#sheetQty").textContent = sh.qty;
//   $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
//   $("#sheetMinus").disabled = sh.qty <= 1;
// }

// function openSheet(id) {
//   const p = state.products.find((x) => x.id === id);
//   if (!p) return;
//   const groups = groupsFor(p);
//   state.sheet = { product: p, groups, qty: 1 };
//   $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
//   $("#sheetCat").textContent = categoryName(p);
//   $("#sheetTitle").textContent = p.name;
//   $("#sheetDesc").textContent = p.description || "";
//   $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
//   $("#sheetGroups").innerHTML = groups.map((g, i) => {
//     const single = g.type === "single";
//     const kind = single && g.required ? "radio" : "checkbox";
//     const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
//     return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
//       g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
//       `</div></fieldset>`;
//   }).join("");
//   $("#sheetAdd").disabled = false;
//   updateSheetTotal();
//   $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
//   openModal("#productSheet");
//   setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
// }

// async function performAdd(snap) {
//   if (!(await addToCart(snap.product.id, snap.qty, snap.note))) return false;
//   for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
//   return true;
// }
// function flyToCart() {              // the photo shrinks into the cart button
//   if (REDUCE) return;
//   const src = $("#sheetMedia img"), dest = $("#cartBtn");
//   if (!src || !dest) return;
//   const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
//   if (!a.width) return;
//   const c = src.cloneNode();
//   Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
//   document.body.appendChild(c);
//   requestAnimationFrame(() => {
//     const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
//     c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
//   });
//   setTimeout(() => c.remove(), 900);
// }
// async function submitSheet() {
//   const sh = state.sheet; if (!sh) return;
//   const picks = sheetPicks();
//   const labels = [], extras = [];
//   sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
//   const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
//   if (!Auth.token) {
//     state.pendingAction = () => performAdd(snap);
//     $("#productSheet").classList.remove("open");
//     showAuth("login");
//     return;
//   }
//   $("#sheetAdd").disabled = true;
//   flyToCart();
//   const ok = await performAdd(snap);
//   $("#sheetAdd").disabled = false;
//   if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
// }

// /* ---------- auth ---------- */
// async function loadUser() {
//   state.user = null;
//   if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
//   const loggedIn = !!state.user;
//   state.opts = loggedIn ? loadOpts() : {};
//   const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
//   $("#authBtn").innerHTML = authIcon + (loggedIn ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>` : esc(T().signin));
//   $("#ordersBtn").classList.add("hidden");  // orders are sent to the branch on WhatsApp, not tracked here
//   $("#adminLink").classList.toggle("hidden", !(loggedIn && state.user.role === "admin"));
// }

// const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
// /* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
// function showAuth(mode = "login", note = "") {
//   setAuthMode(mode);
//   if (note && mode === "login") $("#authSub").textContent = note;
//   openModal("#authModal");
//   setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
// }
// function setAuthMode(mode) {
//   state.authMode = mode;
//   const [title, sub, btn] = mode === "signup"
//     ? [T().signupTitle, T().signupSub, T().signupBtn]
//     : [T().loginTitle, T().loginSub, T().loginBtn];
//   $("#authTitle").textContent = title;
//   $("#authSub").textContent = sub;
//   $("#authSubmit").textContent = btn;
//   $("#tabLogin").classList.toggle("on", mode === "login");
//   $("#tabSignup").classList.toggle("on", mode === "signup");
//   $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
//   $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
//   $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
//   $("#authErr").textContent = "";
//   $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
// }
// function authError(msg, field) {
//   $("#authErr").textContent = msg;
//   if (field) { $(field).classList.add("bad"); $(field).focus(); }
//   return false;
// }
// async function submitAuth(ev) {
//   ev.preventDefault();
//   const mode = state.authMode;
//   $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
//   $$("#authForm input").forEach((i) => i.classList.remove("bad"));
//   const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
//   if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
//   if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
//   if (!pass) return authError("Please enter your password.", "#fPass");
//   if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
//   $("#authSubmit").disabled = true;
//   try {
//     const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
//     const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
//     Auth.token = res.access_token;
//     await loadUser();
//     if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
//     closeAll();
//     $("#authForm").reset();
//     toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
//     await loadCart();
//     if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
//   } catch (e) { $("#authErr").textContent = e.message; }
//   finally { $("#authSubmit").disabled = false; }
// }

// function logout() {
//   Auth.logout(); state.user = null;
//   loadUser(); loadCart(); closeAll();
//   toast(T().tLoggedOut);
// }

// /* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
// const CO = { step: 1, mode: "delivery" };
// function setStep(n) {
//   CO.step = n;
//   $$("#checkoutModal .co-step").forEach((el) => {
//     const on = Number(el.dataset.step) === n;
//     el.classList.toggle("hidden", !on);
//     if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
//   });
//   $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
//   $("#coBack").classList.toggle("hidden", n === 1);
//   $("#coNext").classList.toggle("hidden", n === 3);
//   $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
//   $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
//   $("#checkoutErr").textContent = "";
//   if (n === 3) renderReview();
// }
// function setMode(mode) {
//   CO.mode = mode;
//   $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
//   $("#addrWrap").classList.toggle("hidden", mode === "pickup");
//   $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
// }
// function syncNoteUI() {
//   const v = $("#cNotes").value;
//   $("#noteCount").textContent = v.length;
//   $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
//   if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
// }
// function toggleNote(text) {
//   const box = $("#cNotes");
//   const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
//   const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
//   if (at >= 0) parts.splice(at, 1); else parts.push(text);
//   box.value = parts.join(", ").slice(0, 300);
//   syncNoteUI();
// }
// function renderReview() {
//   const own = $("#cNotes").value.trim();
//   const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
//   $("#checkoutSummary").innerHTML =
//     state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
//     `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
//     `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
//     `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
// }
// function openCheckout() {
//   if (!state.cart.items.length) return;
//   $("#cNotes").value = "";
//   setMode(CO.mode);
//   syncNoteUI();
//   setStep(1);
//   $("#drawer").classList.remove("open");
//   openModal("#checkoutModal");
// }
// function nextStep() {
//   if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
//   setStep(CO.step + 1);
// }
// async function placeOrder() {
//   const btn = $("#placeOrderBtn");
//   const branch = selectedBranch();
//   if (!branch || !branch.whatsapp_number) { $("#checkoutErr").textContent = T().chooseBranch; return; }
//   if (!state.cart.items.length) return;
//   btn.disabled = true;
//   // Open WhatsApp first, in the click's own tick, so the browser allows the popup.
//   const url = "https://wa.me/" + branch.whatsapp_number + "?text=" + encodeURIComponent(waMessage(branch));
//   window.open(url, "_blank", "noopener,noreferrer");
//   // Then clear the cart so the next order starts fresh.
//   try { state.cart = await api("/cart", { method: "DELETE" }); } catch { /* ignore */ }
//   state.opts = {}; saveOpts();
//   $("#cNotes").value = "";
//   await loadCart();
//   closeAll();
//   toast(T().sentWhatsapp);
//   btn.disabled = false;
// }

// /* ---------- my orders ---------- */
// async function showOrders() {
//   openModal("#ordersModal");
//   await refreshOrders();
//   clearInterval(state.ordersTimer);
//   state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
// }
// const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
// const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
// const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
// function tracker(status) {
//   if (status === "cancelled") return "";
//   const at = TRACK.indexOf(status);
//   const parts = TRACK.map((_, i) =>
//     `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
//   return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
// }
// async function refreshOrders() {
//   const box = $("#ordersList");
//   try {
//     const orders = await api("/orders");
//     if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
//     box.innerHTML = orders.map((o) => `
//       <div class="order">
//         <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
//         <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
//         ${tracker(o.status)}
//         <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
//         ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
//         ${o.notes ? `<div class="kn">${esc(o.notes)}</div>` : ""}
//         <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
//           ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
//       </div>`).join("");
//   } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
// }
// async function cancelOrder(id) {
//   if (!confirm("Cancel this order?")) return;
//   try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
//   catch (e) { toast(e.message, "error"); }
// }

// /* ---------- wiring ---------- */
// function setSearch(v) {
//   state.search = v; $("#search").value = v; $("#searchMobile").value = v;
//   if (v.trim()) {                                   // searching shows results from every category
//     const wasCats = state.view === "cats";
//     state.activeCategory = "all"; setMenuMode(true); setView("items");
//     if (wasCats) window.scrollTo({ top: 0 });
//   } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
//   renderCategories(); renderMenu();
// }
// function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }

// document.addEventListener("click", (ev) => {
//   const t = ev.target.closest("button, a, .overlay");
//   if (!t) {
//     const card = ev.target.closest("[data-open]");
//     if (card) openSheet(card.dataset.open);
//     return;
//   }
//   if (t.matches("[data-add]")) {
//     const p = state.products.find((x) => x.id === t.dataset.add);
//     if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add);
//   }
//   else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
//   else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
//   else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
//   else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
//   else if (t.matches("[data-go-offers]")) {
//     const offers = state.categories.find(isOfferCategory);
//     if (offers) openCategory(offers.id, true); else enterMenu();
//     scrollToMenu();
//   }
//   else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
//   else if (t.matches("[data-cat-nav]")) {
//     const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
//     row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
//   }
//   else if (t.matches("[data-cat]")) {
//     openCategory(t.dataset.cat);
//     scrollToMenu();
//   } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
//   else if (t.matches("[data-eye]")) {
//     const f = $("#fPass"), show = f.type === "password";
//     f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
//   }
// });

// $("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
// $("#authBtn").onclick = () => (state.user ? logout() : showAuth());
// $("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
// $("#ordersBtn").onclick = showOrders;
// $("#checkoutBtn").onclick = () => { if (!Auth.token) return showAuth("login"); openCheckout(); };
// $("#clearCartBtn").onclick = async () => { try { state.cart = await api("/cart", { method: "DELETE" }); state.opts = {}; renderCart(); } catch (e) { toast(e.message, "error"); } };
// $("#placeOrderBtn").onclick = placeOrder;
// $("#coNext").onclick = nextStep;
// $("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
// $("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
// $("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
// $("#cNotes").addEventListener("input", syncNoteUI);
// $("#sheetAdd").onclick = submitSheet;
// $("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
// $("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
// $("#sheetGroups").addEventListener("change", (e) => {
//   const input = e.target; if (!input.matches("input")) return;
//   const m = /^g(\d+)$/.exec(input.name); if (!m) return;
//   const g = state.sheet.groups[Number(m[1])];
//   if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
//   updateSheetTotal();
// });
// document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
//   if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
// });
// { const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
// $("#search").addEventListener("input", (e) => setSearch(e.target.value));
// $("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
// document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
// window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

// (async function init() {
//   setView("cats");
//   applyDir();
//   applyI18n();
//   $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
//   await loadUser();
//   await Promise.all([loadMenu(), loadCart(), loadBranches()]);
// })();



/* Customer facing shop */
const state = {
  user: null,
  categories: [],
  products: [],
  branches: [],
  branchId: null,        // the branch the order's WhatsApp goes to
  activeCategory: "all",
  view: "cats",          // "cats" = the category grid, "items" = category strip + products
  search: "",
  cart: { items: [], total: 0, item_count: 0 },
  pendingAction: null,   // something to finish after the customer logs in
  opts: {},              // choices (like spicy) per cart item, kept on this device: { productId: [{ qty, text }] }
  sheet: null,           // the item page that is open
  authMode: "login",
  ordersTimer: null,
};

/* ---------- helpers ---------- */
function openModal(id) { $("#overlay").classList.add("open"); $(id).classList.add("open"); }
function closeAll() {
  $("#overlay").classList.remove("open");
  $$(".modal.open, .drawer.open").forEach((m) => m.classList.remove("open"));
  clearInterval(state.ordersTimer);
}
function qtyInCart(productId) {
  const line = state.cart.items.find((i) => i.product_id === productId);
  return line ? line.quantity : 0;
}
// A real photo when one was uploaded, otherwise a quiet neutral placeholder.
const thumb = (url, name) =>
  url ? `<img src="${esc(imgSrc(url))}" alt="${esc(name)}" loading="lazy">` : PLACEHOLDER_ICON;
const isOfferCategory = (c) => /offer|deal|عرض|عروض/i.test(c.name);

/* ---------- language ----------
   Static strings carry data-i18n / data-i18n-ph / data-i18n-html in index.html
   and are filled from this dictionary. JS-built strings read it through T(). */
const I18N = {
  en: {
    all: "All", add: "Add", options: "Choose options", search: "What are you craving?",
    categories: "Categories", item: "item", items: "items",
    emptyNoMatch: "Nothing matches your search.", emptyNoMenu: "The menu is empty right now. Please check back soon.",
    navHome: "Home", navMenu: "Menu", navAbout: "About", navContact: "Contact", navSocials: "Socials",
    heroLine1: "Welcome To Hank’s BBQ,", heroLine2: " والله<b class=\"hl\">هلا</b>",
    ordernow: "Order now", offers: "See today's offers",
    aboutEyebrow: "About us", aboutTitle: "Cooked by a family, shared with everyone",
    aboutLede: "Hank’s BBQ began with a young Lebanese family and one simple dream: open a small place of their own and cook the food they love. They started from scratch with very little, and shared every step of the journey on TikTok.",
    aboutP2: "People connected with the honest story and the bold, flavor packed street food, and a community grew around it. We are still a family run kitchen, and every order is made with that same heart.",
    aboutFollow: "Follow our story", capWalls: "Our walls", capHi: "Come say hi",
    signin: "Sign in", signout: "Sign out", orders: "My orders", admin: "Admin panel",
    cart: "Your cart", total: "Total", checkout: "Checkout", empty: "Empty cart", each: "each",
    cartEmpty1: "Your cart is empty.", cartEmpty2: "Add something from the menu.",
    addToCart: "Add to cart", reqRequired: "Required", reqOptional: "Optional", reqAny: "Choose any",
    tabSignin: "Sign in", tabSignup: "Sign up", flName: "Full name", flNamePh: "Your full name",
    flPhone: "Phone number", flPass: "Password", authHelp: "At least 8 characters, with letters and numbers.",
    loginTitle: "Welcome back", loginSub: "Sign in to order and track your food.", loginBtn: "Sign in",
    signupTitle: "Create your account", signupSub: "It takes a minute and saves your orders.", signupBtn: "Create account",
    passPhNew: "Create a password", passPhLogin: "Enter your password",
    authLegal: "By creating an account you agree to our <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms of Service</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
    coTitle: "Place your order", stepDelivery: "Delivery", stepNotes: "Notes", stepReview: "Review",
    modeDelivery: "Delivery", modePickup: "Pickup", addrLabel: "Delivery address", addrPh: "Street, building, floor",
    pickupHint: "Pickup is free. We will have it ready for you at the counter.",
    notesLabel: "Notes for your order (optional)", notesPh: "No pickles, extra sauce, allergies, anything the kitchen should know",
    chipNoPickles: "No pickles", chipNoOnions: "No onions", chipSauceSide: "Sauce on the side", chipNapkins: "Extra napkins", chipSpicy: "Extra spicy",
    back: "Back", continue: "Continue", reviewOrder: "Review order", skipNotes: "Skip notes", confirm: "Confirm order",
    deliverTo: "Deliver to", pickupWord: "Pickup", pickupReady: "We will have it ready for you at the counter.",
    yourNotes: "Your notes", noNotes: "No notes",
    contactUs: "Contact us", privacy: "Privacy Policy", terms: "Terms of Service",
    noOrders: "No orders yet.", orderWord: "Order", cancelOrder: "Cancel order", deliverToLine: "Deliver to:",
    trackReceived: "Received", trackCooking: "Cooking", trackReady: "Ready", trackOnway: "On the way", trackDelivered: "Delivered",
    st_pending: "Pending", st_preparing: "Preparing", st_ready: "Ready", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
    tAccountCreated: "Account created. Welcome to Hank’s!", tWelcome: "Welcome back!", tLoggedOut: "Logged out",
    tOrderPlaced: "Order placed. The pit is on it.", tAdded: "added", tSessionExpired: "Your session expired, please sign in again.",
    branchLabel: "Your branch", chooseBranch: "Please choose a branch first.", orderPlaced: "Order received! The kitchen has it.", needName: "Please enter your name.", needPhone: "Please enter your phone number.", nameLabel: "Your name", phoneLabel: "Your phone number", namePh: "Your name", phonePh: "e.g. 70 123 456", sentWhatsapp: "Opening WhatsApp with your order…", sendWa: "Send order on WhatsApp", pickBranchTitle: "Choose your branch to start", skipIntro: "Skip", ticketBranch: "Branch", ticketGo: "Order here", ticketLast: "Last time",
  },
  ar: {
    all: "الكل", add: "أضف", options: "اختر", search: "ابحث في القائمة",
    categories: "الأصناف", item: "صنف", items: "أصناف",
    emptyNoMatch: "لا شيء يطابق بحثك.", emptyNoMenu: "القائمة فارغة حالياً. تفقّدها قريباً.",
    navHome: "الرئيسية", navMenu: "القائمة", navAbout: "من نحن", navContact: "تواصل", navSocials: "تابعنا",
    heroLine1: "أهلاً فيكم بهانكس باربكيو،", heroLine2: "<b class=\"hl\">هلا</b> والله",
    ordernow: "اطلب الآن", offers: "عروض اليوم",
    aboutEyebrow: "من نحن", aboutTitle: "مطبخٌ عائلي، نشارككم إيّاه جميعاً",
    aboutLede: "بدأت هانكس باربكيو بعائلة لبنانية شابة وحلمٍ بسيط: افتتاح مكانٍ صغير خاص بهم وطهو الطعام الذي يحبّونه. انطلقوا من الصفر بإمكانات بسيطة، وشاركوا كل خطوة من رحلتهم على تيك توك.",
    aboutP2: "تفاعل الناس مع القصة الصادقة والطعام الشعبي الغني بالنكهات، فنمت حولها عائلة من المحبّين. ما زلنا مطبخاً عائلياً، وكل طلب يُحضّر بالحب نفسه.",
    aboutFollow: "تابع قصتنا", capWalls: "جدراننا", capHi: "مرّوا للسلام",
    signin: "تسجيل الدخول", signout: "تسجيل الخروج", orders: "طلباتي", admin: "لوحة الإدارة",
    cart: "سلتك", total: "المجموع", checkout: "إتمام الطلب", empty: "إفراغ السلة", each: "للواحد",
    cartEmpty1: "سلتك فارغة.", cartEmpty2: "أضف شيئاً من القائمة.",
    addToCart: "أضف إلى السلة", reqRequired: "مطلوب", reqOptional: "اختياري", reqAny: "اختر ما تشاء",
    tabSignin: "دخول", tabSignup: "حساب جديد", flName: "الاسم الكامل", flNamePh: "اسمك الكامل",
    flPhone: "رقم الهاتف", flPass: "كلمة السر", authHelp: "٥٨ أحرف على الأقل، مع أحرف وأرقام.",
    loginTitle: "أهلاً بعودتك", loginSub: "سجّل الدخول لتطلب وتتابع طعامك.", loginBtn: "تسجيل الدخول",
    signupTitle: "أنشئ حسابك", signupSub: "يستغرق دقيقة ويحفظ طلباتك.", signupBtn: "إنشاء حساب",
    passPhNew: "أنشئ كلمة سر", passPhLogin: "أدخل كلمة السر",
    authLegal: "بإنشائك حساباً فإنك توافق على <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">شروط الخدمة</a> و<a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">سياسة الخصوصية</a>.",
    coTitle: "أكمل طلبك", stepDelivery: "التوصيل", stepNotes: "ملاحظات", stepReview: "مراجعة",
    modeDelivery: "توصيل", modePickup: "استلام", addrLabel: "عنوان التوصيل", addrPh: "الشارع، المبنى، الطابق",
    pickupHint: "الاستلام مجاني. سنجهّزه لك عند الكاونتر.",
    notesLabel: "ملاحظات لطلبك (اختياري)", notesPh: "لا مخلل، صلصة إضافية، حساسية، أي شيء يهم المطبخ",
    chipNoPickles: "بلا مخلل", chipNoOnions: "بلا بصل", chipSauceSide: "الصلصة على الجانب", chipNapkins: "مناديل إضافية", chipSpicy: "حار أكثر",
    back: "رجوع", continue: "متابعة", reviewOrder: "مراجعة الطلب", skipNotes: "تخطّي الملاحظات", confirm: "تأكيد الطلب",
    deliverTo: "التوصيل إلى", pickupWord: "استلام", pickupReady: "سنجهّزه لك عند الكاونتر.",
    yourNotes: "ملاحظاتك", noNotes: "لا ملاحظات",
    contactUs: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
    noOrders: "لا طلبات بعد.", orderWord: "طلب", cancelOrder: "إلغاء الطلب", deliverToLine: "التوصيل إلى:",
    trackReceived: "استُلم", trackCooking: "قيد الطهو", trackReady: "جاهز", trackOnway: "في الطريق", trackDelivered: "تم التوصيل",
    st_pending: "قيد الانتظار", st_preparing: "قيد التحضير", st_ready: "جاهز", st_out_for_delivery: "قيد التوصيل", st_delivered: "تم التوصيل", st_cancelled: "ملغى",
    tAccountCreated: "تم إنشاء الحساب. أهلاً بك في هانكس!", tWelcome: "أهلاً بعودتك!", tLoggedOut: "تم تسجيل الخروج",
    tOrderPlaced: "تم استلام طلبك. المطبخ بدأ العمل!", tAdded: "أُضيف", tSessionExpired: "انتهت جلستك، الرجاء تسجيل الدخول من جديد.",
    branchLabel: "فرعك", chooseBranch: "الرجاء اختيار فرع أولاً.", orderPlaced: "وصل طلبك! المطبخ بدأ التحضير.", needName: "الرجاء إدخال اسمك.", needPhone: "الرجاء إدخال رقم هاتفك.", nameLabel: "اسمك", phoneLabel: "رقم هاتفك", namePh: "اسمك", phonePh: "مثال: 70 123 456", sentWhatsapp: "يتم فتح واتساب بطلبك…", sendWa: "أرسل الطلب عبر واتساب", pickBranchTitle: "اختر فرعك للبدء", skipIntro: "تخطّي", ticketBranch: "فرع", ticketGo: "اطلب من هنا", ticketLast: "زيارتك الأخيرة",
  },
};
const T = () => I18N[Lang.current];

function updateLangBtn() {
  const b = $("#langBtn");
  if (!b) return;
  b.textContent = Lang.isAr ? "EN" : "ع";
  b.setAttribute("aria-label", Lang.isAr ? "Switch to English" : "التبديل إلى العربية");
}
function applyI18n() {
  const t = T();
  $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
  $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
  $$("[data-i18n-ph]").forEach((el) => { const v = t[el.dataset.i18nPh]; if (v !== undefined) el.placeholder = v; });
  document.title = (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName) + (Lang.isAr ? " | اطلب أونلاين" : " | Order online");
  updateLangBtn();
}
async function setLang(v) {
  Lang.current = v;
  applyDir();
  applyI18n();
  if (typeof setAuthMode === "function") setAuthMode(state.authMode);  // refresh auth modal text
  if (typeof CO !== "undefined" && $("#checkoutModal").classList.contains("open")) setStep(CO.step);  // re-render open checkout
  await loadUser();
  await loadMenu();                                 // re-prices the cart names in the new language
  await Promise.all([loadCart(), loadBranches()]);
}

/* ---------- branches (where the order's WhatsApp goes) ---------- */
async function loadBranches() {
  try { state.branches = await api("/branches", { auth: false }); } catch { state.branches = []; }
  if (!state.branches.length) return;
  let saved = null;
  try { saved = localStorage.getItem("branchId"); } catch { /* private mode */ }
  state.lastBranchId = state.branches.some((b) => b.id === saved) ? saved : null;  // only set if they really chose one before
  if (!state.lastBranchId) saved = state.branches[0].id;
  state.branchId = saved;
  try { localStorage.setItem("branchId", saved); } catch { /* private mode */ }
  refreshBranchMenu();
  renderIntroBranches();
}
function selectedBranch() { return state.branches.find((b) => b.id === state.branchId) || state.branches[0] || null; }

/* ---------- per-branch menu ----------
   The server sends every category and item with all_branches / branch_ids.
   The shop shows only what the chosen branch carries. */
function applyBranchFilter() {
  const bid = state.branchId;
  const onBranch = (x) => x.all_branches !== false || !bid || (x.branch_ids || []).includes(bid);
  const cats = (state.allCategories || []).filter(onBranch);
  const catIds = new Set(cats.map((c) => c.id));
  state.categories = cats;
  state.products = (state.allProducts || []).filter((p) => onBranch(p) && (!p.category_id || catIds.has(p.category_id)));
}
function refreshBranchMenu() {      // call whenever the chosen branch changes
  if (!state.allProducts) return;
  applyBranchFilter();
  if (state.activeCategory !== "all" && !state.categories.some((c) => c.id === state.activeCategory)) state.activeCategory = "all";
  const offers = state.categories.find(isOfferCategory);
  $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
  recomputeCart(); renderCart();
  renderCategories(); renderMenu();
}

// The branch chooser shown on the opening screen, one box per branch.
function renderIntroBranches() {
  const grid = $("#introBranchGrid"), box = $("#introBranch"), intro = $("#intro");
  if (!grid || !box || !intro || typeof window.hanksReveal !== "function") return;  // intro skipped/removed
  if (!state.branches.length) return;
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const num = (n) => (Lang.isAr ? n.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0"));
  grid.innerHTML = state.branches.map((b, i) =>
    `<button type="button" class="intro-branch-card" data-branch="${esc(b.id)}" style="--i:${i}" aria-label="${esc(b.name)}${b.address ? ", " + esc(b.address) : ""}">
      <span class="ibc-clip" aria-hidden="true"></span>
      <span class="ibc-swing"><span class="ibc-paper">
        ${b.id === state.lastBranchId ? `<span class="ibc-last" aria-hidden="true">${esc(T().ticketLast)}</span>` : ""}
        <span class="ibc-main">
          <span class="ibc-top"><span class="ibc-label">${esc(T().ticketBranch)}</span><span class="ibc-no" aria-hidden="true">${num(i + 1)}</span></span>
          <span class="ibc-name">${esc(b.name)}</span>
          <span class="ibc-addr">${b.address ? pin + "<span>" + esc(b.address) + "</span>" : ""}</span>
        </span>
        <span class="ibc-stub"><span class="ibc-go">${esc(T().ticketGo)}</span><span class="ibc-arrow">${arrow}</span></span>
      </span></span>
    </button>`).join("");
  intro.classList.add("ready");  // cancels the CSS failsafe that would hide the intro after 7s
  box.classList.remove("hidden");
}
// Picking a branch docket stores the choice, tears its stub off, then enters the site.
document.addEventListener("click", (e) => {
  const card = e.target.closest(".intro-branch-card");
  if (!card || card.classList.contains("torn")) return;
  state.branchId = card.dataset.branch;
  try { localStorage.setItem("branchId", state.branchId); } catch { /* private mode */ }
  const sel = $("#branchSelect"); if (sel) sel.value = state.branchId;
  refreshBranchMenu();
  const enter = () => { if (typeof window.hanksReveal === "function") window.hanksReveal(); };
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { enter(); return; }
  card.classList.add("torn");
  setTimeout(enter, 380);
});

/* Build the order message that is sent to the branch on WhatsApp. */
function waMessage(branch, name, phone, orderId) {
  const ar = Lang.isAr;
  const lines = [];
  lines.push(ar ? "🔥 طلب جديد — هانكس باربكيو" : "🔥 New order — Hank's BBQ");
  lines.push((ar ? "الفرع: " : "Branch: ") + branch.name);
  if (orderId) lines.push((ar ? "رقم الطلب: #" : "Order: #") + shortId(orderId));
  const who = name || (state.user ? displayName(state.user) : "");
  const tel = phone || (state.user ? state.user.phone_number : "");
  if (who) lines.push((ar ? "الاسم: " : "Name: ") + who);
  if (tel) lines.push((ar ? "الهاتف: " : "Phone: ") + tel);
  lines.push("————");
  for (const i of state.cart.items) {
    let line = `${i.quantity} × ${i.product_name} — ${money(i.sub_total)}`;
    const ch = lineChoices(i.product_id);
    if (ch) line += "\n   • " + ch.replace(/\n/g, "، ");
    lines.push(line);
  }
  lines.push("————");
  lines.push((ar ? "المجموع: " : "Total: ") + money(state.cart.total));
  const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
  lines.push(addr ? (ar ? "التوصيل إلى: " : "Deliver to: ") + addr
                  : (ar ? "الاستلام من الفرع" : "Pickup at branch"));
  const note = $("#cNotes").value.trim();
  if (note) lines.push((ar ? "ملاحظات: " : "Notes: ") + note);
  return lines.join("\n");
}

/* ---------- menu ---------- */
async function loadMenu() {
  $("#menu").innerHTML = `<div class="grid solo">${'<div class="skel"></div>'.repeat(6)}</div>`;
  try {
    const [cats, prods] = await Promise.all([api("/categories", { auth: false }), api("/products", { auth: false })]);
    state.allCategories = cats;
    state.allProducts = prods;
    applyBranchFilter();
  } catch (e) {
    $("#menu").innerHTML = `<div class="empty">${esc(e.message)}</div>`;
    return;
  }
  const offers = state.categories.find(isOfferCategory);
  $("#offersBtn").classList.toggle("hidden", !(offers && state.products.some((p) => p.category_id === offers.id)));
  renderCategories();
  renderMenu();
}

/* ---------- menu views ----------
   Menu mode hides the home sections (hero, about) and shows the menu.
   Inside the menu: "cats" = big category grid, "items" = category strip on top + the products below. */
function setView(v) {
  state.view = v;
  document.body.classList.toggle("view-cats", v === "cats");
  document.body.classList.toggle("view-items", v === "items");
}
function setMenuMode(on) { document.body.classList.toggle("menu-mode", on); }
function enterMenu() {              // the Menu link / Order now: always start on the category grid
  state.search = ""; $("#search").value = ""; $("#searchMobile").value = "";
  state.activeCategory = "all";
  setMenuMode(true); setView("cats");
  renderCategories(); renderMenu();
}
function leaveMenu() {              // back to the home page: the category grid stays visible below About
  setMenuMode(false); setView("cats"); state.activeCategory = "all";
  renderCategories(); renderMenu();
}
function openCategory(id, stay) {   // stay: keep the home page as it is (used by "See today's offers")
  state.activeCategory = id;
  if (!stay) setMenuMode(true);
  setView("items");
  renderCategories(); renderMenu();
}

function renderCategories() {
  const counts = {};
  state.products.forEach((p) => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
  const used = state.categories.filter((c) => counts[c.id]);

  const tile = (c) => {
    const n = counts[c.id];
    const has = !!c.image_url;
    return `<button type="button" class="ctile ${state.activeCategory === c.id ? "active" : ""}" data-cat="${esc(c.id)}" aria-label="${esc(c.name)}, ${n} ${n === 1 ? esc(T().item) : esc(T().items)}">
      <span class="ctile-img">${has ? `<img src="${esc(imgSrc(c.image_url))}" alt="" loading="lazy">` : `<span class="tile-ph" aria-hidden="true"></span>`}</span>
      <span class="ctile-lbl">${esc(c.name)}</span></button>`;
  };
  const html = used.map(tile).join("");
  $("#tiles").innerHTML = html;   // big grid (Menu page)
  $("#cats").innerHTML = html;    // strip above the products
  $("#browse").classList.toggle("hidden", used.length === 0);

  const act = $("#cats .active");  // keep the chosen category in view inside the strip
  if (act) { const row = $("#cats"); row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2; }
}

function productCard(p, instant = false) {
  const q = qtyInCart(p.id);
  const action = q
    ? `<div class="stepper"><button data-dec="${esc(p.id)}" aria-label="Remove one">&minus;</button><span>${q}</span><button data-inc="${esc(p.id)}" aria-label="Add one">+</button></div>`
    : `<button class="btn sm" data-add="${esc(p.id)}">${esc(T().add)}</button>`;
  let tag = "", old = "";
  if (p.old_price && p.old_price > p.price) {
    const off = Math.round((1 - p.price / p.old_price) * 100);
    tag = `<span class="tag">Save ${off}%</span>`;
    old = `<s>${money(p.old_price)}</s>`;
  }
  return `<article class="card reveal${instant ? " in" : ""}" data-open="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}, choose options">
    <div class="pic">${thumb(p.image_url, p.name)}${tag}</div>
    <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p>
      <div class="foot"><span class="price">${money(p.price)}${old}</span>${action}</div></div>
  </article>`;
}

let lastMenuKey = "";
function renderMenu() {
  // Cart changes re-render the cards; only animate them when the visible set really changes.
  const key = state.activeCategory + "|" + state.products.length;
  const instant = key === lastMenuKey;
  lastMenuKey = key;

  const term = state.search.trim().toLowerCase();
  if (state.view === "cats" && !term) { $("#menu").innerHTML = ""; return; }
  let list = state.products;
  if (term) list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term));
  if (state.activeCategory !== "all") list = list.filter((p) => p.category_id === state.activeCategory);

  if (!list.length) {
    $("#menu").innerHTML = `<div class="empty">${esc(state.products.length ? T().emptyNoMatch : T().emptyNoMenu)}</div>`;
    return;
  }
  if (state.activeCategory === "all" && !term) {
    let html = "";
    const title = (name, count) => `<h2 class="section-title">${esc(name)}<span class="cnt">${count} ${esc(count > 1 ? T().items : T().item)}</span></h2>`;
    for (const c of state.categories) {
      const items = list.filter((p) => p.category_id === c.id);
      if (items.length) html += `${title(c.name, items.length)}<div class="grid">${items.map((p) => productCard(p, instant)).join("")}</div>`;
    }
    const orphans = list.filter((p) => !p.category_id);
    if (orphans.length) html += `${title(Lang.isAr ? "المزيد" : "More", orphans.length)}<div class="grid">${orphans.map((p) => productCard(p, instant)).join("")}</div>`;
    $("#menu").innerHTML = html;
  } else {
    $("#menu").innerHTML = `<div class="grid solo">${list.map((p) => productCard(p, instant)).join("")}</div>`;
  }
}

/* ---------- cart (kept in the browser, no account needed) ---------- */
const CART_KEY = "cart:v1";
function cartLines() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCartLines(lines) { try { localStorage.setItem(CART_KEY, JSON.stringify(lines)); } catch { /* private mode */ } }
function recomputeCart() {
  const items = [];
  for (const ln of cartLines()) {
    const p = state.products.find((x) => x.id === ln.product_id);
    if (!p) continue;  // product gone from the menu
    items.push({ product_id: p.id, product_name: p.name, image_url: p.image_url, unit_price: p.price, quantity: ln.quantity, sub_total: p.price * ln.quantity });
  }
  state.cart = { items, total: items.reduce((a, i) => a + i.sub_total, 0), item_count: items.reduce((a, i) => a + i.quantity, 0) };
}
async function loadCart() { recomputeCart(); renderCart(); }

/* ---------- choices per cart item (spicy, no onions...) ----------
   The server cart only knows items and quantities, so the choices live here, per item,
   and travel to the kitchen inside the order notes. */
const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
function optsKey() { return "opts:" + (state.user ? (state.user.phone_number || state.user.id) : "guest"); }
function loadOpts() { try { return JSON.parse(localStorage.getItem(optsKey())) || {}; } catch { return {}; } }
function saveOpts() { try { localStorage.setItem(optsKey(), JSON.stringify(state.opts)); } catch { /* private mode */ } }
function reconcileOpts() {          // keep our notes in step with what the server cart really holds
  const inCart = new Map(state.cart.items.map((i) => [i.product_id, i.quantity]));
  for (const id of Object.keys(state.opts)) if (!inCart.has(id)) delete state.opts[id];
  for (const [id, q] of inCart) {
    const list = state.opts[id] || (state.opts[id] = []);
    let sum = list.reduce((a, e) => a + e.qty, 0);
    if (sum < q) { if (list.length) list[list.length - 1].qty += q - sum; else list.push({ qty: q, text: "" }); }
    while (sum > q && list.length) {
      const last = list[list.length - 1], cut = Math.min(last.qty, sum - q);
      last.qty -= cut; sum -= cut; if (!last.qty) list.pop();
    }
  }
  saveOpts();
}
function noteAdd(id, qty, note) {   // note === null: a + button, goes on the latest entry
  const list = state.opts[id] || (state.opts[id] = []);
  if (note === null) { if (list.length) list[list.length - 1].qty += qty; else list.push({ qty, text: "" }); }
  else { const same = list.find((e) => e.text === note); if (same) same.qty += qty; else list.push({ qty, text: note }); }
}
function noteRemove(id) {
  const list = state.opts[id]; if (!list || !list.length) return;
  list[list.length - 1].qty -= 1; if (list[list.length - 1].qty <= 0) list.pop();
}
function lineChoices(id) {          // what to show under the item name in the cart
  const list = state.opts[id] || [];
  const withText = list.filter((e) => e.text);
  if (!withText.length) return "";
  return list.length > 1 ? withText.map((e) => `${e.qty} x ${e.text}`).join("\n") : withText[0].text;   // one line per different choice
}
function orderNotes() {             // the kitchen reads this on the order
  const lines = [];
  for (const i of state.cart.items) {
    const list = (state.opts[i.product_id] || []).filter((e) => e.text);
    if (!list.length) continue;
    lines.push(`${i.product_name}: ` + (list.length > 1 || list[0].qty !== i.quantity || i.quantity > 1 ? list.map((e) => `${e.qty} x ${e.text}`).join(" / ") : list[0].text));
  }
  const own = $("#cNotes").value.trim();
  /* the customer's own note always comes last after the marker "Notes: ", the admin panel splits on it */
  return [lines.join(". "), own ? "Notes: " + own : ""].filter(Boolean).join(". ");
}

function renderCart() {
  reconcileOpts();
  const n = state.cart.item_count || 0;
  const badge = $("#cartCount");
  const grew = n > Number(badge.textContent || 0);
  badge.textContent = n;
  if (grew && !REDUCE) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
  $("#cartTotal").textContent = money(state.cart.total);
  const list = $("#cartList");
  if (!state.cart.items.length) {
    list.innerHTML = `<div class="empty">${esc(T().cartEmpty1)}<br>${esc(T().cartEmpty2)}</div>`;
    $("#cartFoot").classList.add("hidden");
  } else {
    $("#cartFoot").classList.remove("hidden");
    list.innerHTML = state.cart.items.map((i) => `
      <div class="line">
        <div class="thumb">${thumb(i.image_url, i.product_name)}</div>
        <div class="info"><b>${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}<small>${money(i.unit_price)} ${esc(T().each)}</small></div>
        <div class="stepper"><button data-dec="${esc(i.product_id)}" aria-label="Remove one">&minus;</button><span>${i.quantity}</span><button data-inc="${esc(i.product_id)}" aria-label="Add one">+</button></div>
        <b>${money(i.sub_total)}</b>
      </div>`).join("");
  }
  renderMenu(); // refresh the +/- steppers on the cards
}

/* sound that plays when an item is added to the cart (not on the +/- steppers) */
const addSound = new Audio("audio/add-to-cart.mp3");
addSound.preload = "auto";
function playAddSound() {
  try { addSound.currentTime = 0; const r = addSound.play(); if (r && r.catch) r.catch(() => {}); } catch (e) {}
  if (window.callMeFX) window.callMeFX();   // the "call me" hand pops up at the very same moment
}

async function addToCart(productId, quantity = 1, note = null, sound = false) {
  const p = state.products.find((x) => x.id === productId);
  if (!p) return false;
  const lines = cartLines();
  const ln = lines.find((l) => l.product_id === productId);
  if (ln) ln.quantity = Math.min(ln.quantity + quantity, 99);
  else lines.push({ product_id: productId, quantity });
  saveCartLines(lines);
  recomputeCart();
  noteAdd(productId, quantity, note);
  renderCart();
  if (sound) playAddSound();
  return true;
}
async function removeOne(productId) {
  const lines = cartLines();
  const ln = lines.find((l) => l.product_id === productId);
  if (ln) ln.quantity -= 1;
  saveCartLines(lines.filter((l) => l.quantity > 0));
  recomputeCart();
  noteRemove(productId);
  renderCart();
}

/* ---------- item page: photo, choices, add to cart ---------- */
function categoryName(p) { const c = state.categories.find((x) => x.id === p.category_id); return c ? c.name : ""; }
function findItem(name) {           // an extra named in js/options.js, looked up on your real menu
  const n = name.trim().toLowerCase();
  return state.products.find((p) => p.name.trim().toLowerCase() === n) || state.products.find((p) => p.name.toLowerCase().includes(n));
}
function groupsFor(p) {
  const cat = categoryName(p);
  const rule = PRODUCT_OPTIONS.find((r) => (r.match.product || r.match.category) && (!r.match.product || r.match.product.test(p.name)) && (!r.match.category || r.match.category.test(cat)));
  if (!rule) return [];
  return rule.groups.map((g) => ({
    ...g,
    choices: g.choices.map((c) => {
      if (!c.item) return { label: c.label, product: null, price: 0 };
      const it = findItem(c.item);
      return it && it.id !== p.id ? { label: c.label || it.name, product: it, price: it.price } : null;
    }).filter(Boolean),
  })).filter((g) => g.choices.length);
}

function sheetPicks() {             // read what is ticked: [Set of choice numbers per group]
  return sheetGroups().map((g, i) => new Set($$(`#sheetGroups input[name="g${i}"]:checked`).map((el) => Number(el.value))));
}
function sheetGroups() { return state.sheet ? state.sheet.groups : []; }
function sheetUnit() {
  const sh = state.sheet; const picks = sheetPicks();
  let unit = sh.product.price;
  sh.groups.forEach((g, i) => picks[i].forEach((j) => { unit += g.choices[j].price; }));
  return unit;
}
function updateSheetTotal() {
  const sh = state.sheet; if (!sh) return;
  $("#sheetQty").textContent = sh.qty;
  $("#sheetAmt").textContent = money(sheetUnit() * sh.qty);
  $("#sheetMinus").disabled = sh.qty <= 1;
}

function openSheet(id) {
  const p = state.products.find((x) => x.id === id);
  if (!p) return;
  const groups = groupsFor(p);
  state.sheet = { product: p, groups, qty: 1 };
  $("#sheetMedia").innerHTML = p.image_url ? `<img src="${esc(imgSrc(p.image_url))}" alt="${esc(p.name)}">` : `<div class="ph big">${thumb(null, p.name)}</div>`;
  $("#sheetCat").textContent = categoryName(p);
  $("#sheetTitle").textContent = p.name;
  $("#sheetDesc").textContent = p.description || "";
  $("#sheetPrice").innerHTML = `${money(p.price)}${p.old_price && p.old_price > p.price ? `<s>${money(p.old_price)}</s>` : ""}`;
  $("#sheetGroups").innerHTML = groups.map((g, i) => {
    const single = g.type === "single";
    const kind = single && g.required ? "radio" : "checkbox";
    const hint = g.required ? T().reqRequired : single ? T().reqOptional : T().reqAny;
    return `<fieldset class="grp" style="--g:${i}"><legend>${esc(g.label)}<em>${hint}</em></legend><div class="opts">` +
      g.choices.map((c, j) => `<label class="opt${c.product ? " extra" : ""}"><input type="${kind}" name="g${i}" value="${j}" ${single && g.required && j === 0 ? "checked" : ""}><span class="t">${esc(c.label)}</span>${c.product ? `<span class="pr">+${money(c.price)}</span>` : ""}</label>`).join("") +
      `</div></fieldset>`;
  }).join("");
  $("#sheetAdd").disabled = false;
  updateSheetTotal();
  $("#sheetMedia").scrollTop = 0; $(".sheet-scroll").scrollTop = 0;
  openModal("#productSheet");
  setTimeout(() => $("#productSheet").focus({ preventScroll: true }), 50);
}

async function performAdd(snap) {
  if (!(await addToCart(snap.product.id, snap.qty, snap.note, true))) return false;   // sound once, for the main item only
  for (const x of snap.extras) if (!(await addToCart(x.id, snap.qty, ""))) return false;
  return true;
}
function flyToCart() {              // the photo shrinks into the cart button
  if (REDUCE) return;
  const src = $("#sheetMedia img"), dest = $("#cartBtn");
  if (!src || !dest) return;
  const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
  if (!a.width) return;
  const c = src.cloneNode();
  Object.assign(c.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", zIndex: 120, objectFit: "cover", borderRadius: "16px", pointerEvents: "none", transition: "transform .8s cubic-bezier(.55,0,.25,1), opacity .8s ease, border-radius .8s" });
  document.body.appendChild(c);
  requestAnimationFrame(() => {
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    c.style.transform = `translate(${dx}px, ${dy}px) scale(.06)`; c.style.opacity = ".35"; c.style.borderRadius = "50%";
  });
  setTimeout(() => c.remove(), 900);
}
async function submitSheet() {
  const sh = state.sheet; if (!sh) return;
  const picks = sheetPicks();
  const labels = [], extras = [];
  sh.groups.forEach((g, i) => picks[i].forEach((j) => { const c = g.choices[j]; if (c.product) extras.push(c.product); else labels.push(c.label); }));
  const snap = { product: sh.product, qty: sh.qty, note: labels.join(", "), extras };
  $("#sheetAdd").disabled = true;
  flyToCart();
  const ok = await performAdd(snap);
  $("#sheetAdd").disabled = false;
  if (ok) { closeAll(); toast(`${snap.qty} × ${snap.product.name} ${T().tAdded}`); }
}

/* ---------- auth ---------- */
async function loadUser() {
  state.user = null;
  if (Auth.token) { try { state.user = await api("/me"); } catch { Auth.logout(); } }
  const loggedIn = !!state.user;
  state.opts = loadOpts();
  const authIcon = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21"/></svg>';
  $("#authBtn").innerHTML = authIcon + (loggedIn
    ? `${esc(T().signout)}<span class="uname"> (${esc(displayName(state.user).split(" ")[0])})</span>`
    : esc(T().signin));
  const hide = (sel, on) => { const e = $(sel); if (e) e.classList.toggle("hidden", on); };
  hide("#ordersBtn", true);                                            // orders go to the branch on WhatsApp
  hide("#adminLink", !(loggedIn && state.user.role === "admin"));
}

const displayName = (u) => (u && (u.full_name || u.phone_number)) || "";
/* Auth modal text comes from I18N (loginTitle/loginSub/loginBtn, signup*). */
function showAuth(mode = "login", note = "") {
  setAuthMode(mode);
  if (note && mode === "login") $("#authSub").textContent = note;
  openModal("#authModal");
  setTimeout(() => $(mode === "signup" ? "#fName" : "#fPhone").focus(), 60);
}
function setAuthMode(mode) {
  state.authMode = mode;
  const [title, sub, btn] = mode === "signup"
    ? [T().signupTitle, T().signupSub, T().signupBtn]
    : [T().loginTitle, T().loginSub, T().loginBtn];
  $("#authTitle").textContent = title;
  $("#authSub").textContent = sub;
  $("#authSubmit").textContent = btn;
  $("#tabLogin").classList.toggle("on", mode === "login");
  $("#tabSignup").classList.toggle("on", mode === "signup");
  $$("#authModal [data-only]").forEach((el) => el.classList.toggle("hidden", !el.dataset.only.split(" ").includes(mode)));
  $("#fPass").autocomplete = mode === "signup" ? "new-password" : "current-password";
  $("#fPass").placeholder = mode === "signup" ? T().passPhNew : T().passPhLogin;
  $("#authErr").textContent = "";
  $("#authOk").classList.add("hidden");
  $$("#authForm input").forEach((i) => i.classList.remove("bad"));
}
function authError(msg, field) {
  $("#authErr").textContent = msg;
  if (field) { $(field).classList.add("bad"); $(field).focus(); }
  return false;
}
async function submitAuth(ev) {
  ev.preventDefault();
  const mode = state.authMode;
  $("#authErr").textContent = ""; $("#authOk").classList.add("hidden");
  $$("#authForm input").forEach((i) => i.classList.remove("bad"));
  const name = $("#fName").value.trim(), phone = $("#fPhone").value.replace(/[\s\-().]/g, ""), pass = $("#fPass").value;
  if (mode === "signup" && name.length < 2) return authError("Please enter your full name.", "#fName");
  if (!/^\+?[0-9]{7,15}$/.test(phone)) return authError("Please enter a valid phone number (digits only, you can start with +).", "#fPhone");
  if (!pass) return authError("Please enter your password.", "#fPass");
  if (mode === "signup" && !(pass.length >= 8 && /[A-Za-z]/.test(pass) && /\d/.test(pass))) return authError("Use at least 8 characters, with letters and numbers.", "#fPass");
  $("#authSubmit").disabled = true;
  try {
    const body = mode === "signup" ? { full_name: name, phone_number: phone, password: pass } : { phone_number: phone, password: pass };
    const res = await api(mode === "signup" ? "/signup" : "/login", { method: "POST", body, auth: false });
    Auth.token = res.access_token;
    await loadUser();
    if (state.user && state.user.role === "admin") { location.href = "admin.html"; return; } // admins go to the dashboard
    closeAll();
    $("#authForm").reset();
    toast(mode === "signup" ? T().tAccountCreated : T().tWelcome);
    await loadCart();
    if (state.pendingAction) { const run = state.pendingAction; state.pendingAction = null; await run(); }
  } catch (e) { $("#authErr").textContent = e.message; }
  finally { $("#authSubmit").disabled = false; }
}

function logout() {
  Auth.logout(); state.user = null;
  loadUser(); loadCart(); closeAll();
  toast(T().tLoggedOut);
}

/* ---------- checkout: three steps. 1 delivery or pickup, 2 notes for the kitchen, 3 review and confirm ---------- */
const CO = { step: 1, mode: "delivery" };
function setStep(n) {
  CO.step = n;
  $$("#checkoutModal .co-step").forEach((el) => {
    const on = Number(el.dataset.step) === n;
    el.classList.toggle("hidden", !on);
    if (on) { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; }
  });
  $$("#coSteps li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
  $("#coBack").classList.toggle("hidden", n === 1);
  $("#coNext").classList.toggle("hidden", n === 3);
  $("#placeOrderBtn").classList.toggle("hidden", n !== 3);
  $("#coNext").textContent = n === 2 ? ($("#cNotes").value.trim() ? T().reviewOrder : T().skipNotes) : T().continue;
  $("#checkoutErr").textContent = "";
  if (n === 3) renderReview();
}
function setMode(mode) {
  CO.mode = mode;
  $$("#coMode button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
  $("#addrWrap").classList.toggle("hidden", mode === "pickup");
  $("#pickupHint").classList.toggle("hidden", mode !== "pickup");
}
function syncNoteUI() {
  const v = $("#cNotes").value;
  $("#noteCount").textContent = v.length;
  $$("#noteChips button").forEach((b) => b.classList.toggle("on", v.toLowerCase().includes(b.textContent.trim().toLowerCase())));
  if (CO.step === 2) $("#coNext").textContent = v.trim() ? T().reviewOrder : T().skipNotes;
}
function toggleNote(text) {
  const box = $("#cNotes");
  const parts = box.value.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
  const at = parts.findIndex((x) => x.toLowerCase() === text.toLowerCase());
  if (at >= 0) parts.splice(at, 1); else parts.push(text);
  box.value = parts.join(", ").slice(0, 300);
  syncNoteUI();
}
function renderReview() {
  const own = $("#cNotes").value.trim();
  const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
  $("#checkoutSummary").innerHTML =
    state.cart.items.map((i) => `<div class="line"><div class="info"><b>${i.quantity} x ${esc(i.product_name)}</b>${lineChoices(i.product_id) ? `<small class="choice">${esc(lineChoices(i.product_id))}</small>` : ""}</div><b>${money(i.sub_total)}</b></div>`).join("") +
    `<div class="total-row" style="margin-top:14px"><span>${esc(T().total)}</span><span>${money(state.cart.total)}</span></div>` +
    `<div class="review-box"><h4>${esc(addr ? T().deliverTo : T().pickupWord)}</h4><p>${addr ? esc(addr) : esc(T().pickupReady)}</p></div>` +
    `<div class="review-box note"><h4>${esc(T().yourNotes)}</h4><p>${own ? esc(own) : esc(T().noNotes)}</p></div>`;
}
function openCheckout() {
  if (!state.cart.items.length) return;
  $("#cNotes").value = "";
  setMode(CO.mode);
  syncNoteUI();
  setStep(1);
  $("#drawer").classList.remove("open");
  openModal("#checkoutModal");
}
function nextStep() {
  if (CO.step === 1 && CO.mode === "delivery" && !$("#cAddress").value.trim()) { $("#checkoutErr").textContent = "Please enter your delivery address, or switch to pickup."; return; }
  setStep(CO.step + 1);
}
async function placeOrder() {
  const btn = $("#placeOrderBtn");
  const branch = selectedBranch();
  if (!branch) { $("#checkoutErr").textContent = T().chooseBranch; return; }
  if (!state.cart.items.length) return;
  // The customer gives a name and phone so the kitchen can reach them.
  const name = ($("#custName") ? $("#custName").value : "").trim();
  const phone = ($("#custPhone") ? $("#custPhone").value : "").trim();
  if (!name) { $("#checkoutErr").textContent = T().needName; return; }
  if (!phone.replace(/\D/g, "")) { $("#checkoutErr").textContent = T().needPhone; return; }
  btn.disabled = true;
  $("#checkoutErr").textContent = "";

  /* One click does two things: the order is saved to the admin board, and the same
     order opens in WhatsApp for the chosen branch. Browsers only allow a new tab
     during the click itself, so we open a blank one now and point it at WhatsApp
     once the order is saved. */
  const waDigits = String(branch.whatsapp_number || "").replace(/\D/g, "");
  const waTab = waDigits ? window.open("", "_blank") : null;

  /* The branch travels first in the notes ("Branch: Jnah. ..."), which the admin panel shows. */
  const addr = CO.mode === "pickup" ? "" : $("#cAddress").value.trim();
  const notes = ("Branch: " + branch.name + ". " + orderNotes()).slice(0, 500);
  const items = state.cart.items.map((i) => ({ product_id: i.product_id, quantity: i.quantity }));
  let order;
  try {
    order = await api("/guest/checkout", { method: "POST", auth: false, body: { customer_name: name, customer_phone: phone, delivery_address: addr, notes, items } });
  } catch (e) {
    if (waTab) waTab.close();                       // the order was not saved, so don't send it on WhatsApp either
    $("#checkoutErr").textContent = e.message;
    btn.disabled = false;
    return;
  }

  // Build the WhatsApp message while the cart is still full, then clear everything.
  const waUrl = waDigits ? "https://wa.me/" + waDigits + "?text=" + encodeURIComponent(waMessage(branch, name, phone, order && order.order_id)) : "";
  saveCartLines([]); state.opts = {}; saveOpts();
  $("#cNotes").value = "";
  recomputeCart(); renderCart();
  closeAll();
  toast(T().orderPlaced + (order && order.order_id ? "  #" + shortId(order.order_id) : ""));
  btn.disabled = false;

  if (waUrl) {
    if (waTab) { try { waTab.opener = null; } catch { /* ignore */ } waTab.location.href = waUrl; }
    else window.location.href = waUrl;              // popup was blocked: go to WhatsApp in this tab (the order is already saved)
  }
}

/* ---------- my orders ---------- */
async function showOrders() {
  openModal("#ordersModal");
  await refreshOrders();
  clearInterval(state.ordersTimer);
  state.ordersTimer = setInterval(refreshOrders, 10000); // live status updates
}
const TRACK = ["pending", "preparing", "ready", "out_for_delivery", "delivered"];
const trackLabels = () => [T().trackReceived, T().trackCooking, T().trackReady, T().trackOnway, T().trackDelivered];
const shopStatus = (s) => T()["st_" + s] || STATUS_LABELS[s] || s;
function tracker(status) {
  if (status === "cancelled") return "";
  const at = TRACK.indexOf(status);
  const parts = TRACK.map((_, i) =>
    `<i class="${i <= at ? "done" : ""} ${i === at && at < TRACK.length - 1 ? "now" : ""}"></i>${i < TRACK.length - 1 ? `<u class="${i < at ? "done" : ""}"></u>` : ""}`).join("");
  return `<div class="progress">${parts}</div><div class="progress-labels">${trackLabels().map((l) => `<span>${esc(l)}</span>`).join("")}</div>`;
}
async function refreshOrders() {
  const box = $("#ordersList");
  try {
    const orders = await api("/orders");
    if (!orders.length) { box.innerHTML = `<div class="empty">${esc(T().noOrders)}</div>`; return; }
    box.innerHTML = orders.map((o) => `
      <div class="order">
        <div class="top"><b>${esc(T().orderWord)} #${shortId(o.order_id)}</b><span class="pill ${esc(o.status)}">${esc(shopStatus(o.status))}</span></div>
        <div class="hint">${o.created_at ? new Date(o.created_at).toLocaleString() : ""}</div>
        ${tracker(o.status)}
        <ul>${o.items.map((i) => `<li>${i.quantity} x ${esc(i.product_name)}, ${money(i.price_at_purchase * i.quantity)}</li>`).join("")}</ul>
        ${o.delivery_address ? `<div class="hint">${esc(T().deliverToLine)} ${esc(o.delivery_address)}</div>` : `<div class="hint">${esc(T().pickupWord)}</div>`}
        ${o.notes ? `<div class="kn">${esc(o.notes.replace(/^Branch: [^.]*\.\s*/, "").replace(/(^|\. )Notes: /, "$1"))}</div>` : ""}
        <div class="top" style="margin-top:10px"><b>${money(o.total)}</b>
          ${o.status === "pending" ? `<button class="btn ghost sm" data-cancel="${esc(o.order_id)}">${esc(T().cancelOrder)}</button>` : ""}</div>
      </div>`).join("");
  } catch (e) { box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}
async function cancelOrder(id) {
  if (!confirm("Cancel this order?")) return;
  try { await api(`/orders/${id}/cancel`, { method: "POST" }); toast("Order cancelled"); refreshOrders(); }
  catch (e) { toast(e.message, "error"); }
}

/* ---------- wiring ---------- */
function setSearch(v) {
  state.search = v; $("#search").value = v; $("#searchMobile").value = v;
  if (v.trim()) {                                   // searching shows results from every category
    const wasCats = state.view === "cats";
    state.activeCategory = "all"; setMenuMode(true); setView("items");
    if (wasCats) window.scrollTo({ top: 0 });
  } else if (state.view === "items" && state.activeCategory === "all") setView("cats");
  renderCategories(); renderMenu();
}
function scrollToMenu() { window.scrollTo({ top: Math.max(0, $("#browse").getBoundingClientRect().top + window.scrollY - 70), behavior: "smooth" }); }
// After picking a category: bring its items to the top, just below the sticky header (its height differs on phones).
function scrollToItems() {
  const header = $("#topbar");
  const offset = (header ? header.getBoundingClientRect().height : 0) + 12;
  const y = $("#menu").getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), behavior: REDUCE ? "auto" : "smooth" });
}

document.addEventListener("click", (ev) => {
  const t = ev.target.closest("button, a, .overlay");
  if (!t) {
    const card = ev.target.closest("[data-open]");
    if (card) openSheet(card.dataset.open);
    return;
  }
  if (t.matches("[data-add]")) {
    const p = state.products.find((x) => x.id === t.dataset.add);
    if (p && groupsFor(p).length) openSheet(p.id); else addToCart(t.dataset.add, 1, null, true);
  }
  else if (t.matches("[data-inc]")) addToCart(t.dataset.inc);
  else if (t.matches("[data-dec]")) removeOne(t.dataset.dec);
  else if (t.matches("[data-cancel]")) cancelOrder(t.dataset.cancel);
  else if (t.matches("[data-scroll-menu]")) { enterMenu(); scrollToMenu(); }
  else if (t.matches("[data-go-offers]")) {
    const offers = state.categories.find(isOfferCategory);
    if (offers) openCategory(offers.id, true); else enterMenu();
    scrollToMenu();
  }
  else if (t.matches("[data-close]") || t.matches(".overlay")) closeAll();
  else if (t.matches("[data-cat-nav]")) {
    const row = $("#cats"), dir = Number(t.dataset.catNav) * (Lang.isAr ? -1 : 1);
    row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: "smooth" });
  }
  else if (t.matches("[data-cat]")) {
    openCategory(t.dataset.cat);
    scrollToItems();
  } else if (t.matches("[data-auth]")) setAuthMode(t.dataset.auth);
  else if (t.matches("[data-eye]")) {
    const f = $("#fPass"), show = f.type === "password";
    f.type = show ? "text" : "password"; t.innerHTML = show ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'; t.setAttribute("aria-label", show ? "Hide password" : "Show password");
  }
});

$("#cartBtn").onclick = () => { $("#overlay").classList.add("open"); $("#drawer").classList.add("open"); };
$("#authBtn").onclick = () => (state.user ? logout() : showAuth());
$("#langBtn").onclick = () => setLang(Lang.isAr ? "en" : "ar");
{ const ob = $("#ordersBtn"); if (ob) ob.onclick = showOrders; }
$("#checkoutBtn").onclick = () => openCheckout();
$("#clearCartBtn").onclick = () => { saveCartLines([]); state.opts = {}; saveOpts(); recomputeCart(); renderCart(); };
$("#placeOrderBtn").onclick = placeOrder;
$("#coNext").onclick = nextStep;
$("#coBack").onclick = () => setStep(Math.max(1, CO.step - 1));
$("#coMode").addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
$("#noteChips").addEventListener("click", (e) => { const b = e.target.closest("button[data-note]"); if (b) toggleNote(b.textContent.trim()); });
$("#cNotes").addEventListener("input", syncNoteUI);
$("#sheetAdd").onclick = submitSheet;
$("#sheetMinus").onclick = () => { if (state.sheet && state.sheet.qty > 1) { state.sheet.qty--; updateSheetTotal(); } };
$("#sheetPlus").onclick = () => { if (state.sheet && state.sheet.qty < 20) { state.sheet.qty++; updateSheetTotal(); } };
$("#sheetGroups").addEventListener("change", (e) => {
  const input = e.target; if (!input.matches("input")) return;
  const m = /^g(\d+)$/.exec(input.name); if (!m) return;
  const g = state.sheet.groups[Number(m[1])];
  if (g.type === "single" && input.checked) $$(`#sheetGroups input[name="${input.name}"]`).forEach((o) => { if (o !== input) o.checked = false; });
  updateSheetTotal();
});
document.addEventListener("keydown", (e) => {   // Enter or Space on a focused card opens it
  if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open]")) { e.preventDefault(); openSheet(e.target.dataset.open); }
});
{ const af = $("#authForm"); if (af) af.addEventListener("submit", submitAuth); }
$("#search").addEventListener("input", (e) => setSearch(e.target.value));
$("#searchMobile").addEventListener("input", (e) => setSearch(e.target.value));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
window.addEventListener("session-expired", () => { loadUser(); loadCart(); toast(T().tSessionExpired, "error"); });

(async function init() {
  setView("cats");
  applyDir();
  applyI18n();
  $("#footName").textContent = "\u00a9 " + new Date().getFullYear() + " " + (Lang.isAr ? CONFIG.shopNameAr : CONFIG.shopName);
  await loadUser();
  await loadMenu();                                 // products first, so the saved cart can be priced
  await Promise.all([loadCart(), loadBranches()]);
})();