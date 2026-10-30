const products = [
 {name:"Bloom hồng",desc:"Hoa khô hồng pastel dịu dàng",price:49000,color:"Hồng",tag:"Bán chạy",img:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85"},
 {name:"Sunny Daisy",desc:"Cúc vàng mang năng lượng tích cực",price:45000,color:"Vàng",tag:"Tươi sáng",img:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=800&q=85"},
 {name:"Lavender Dream",desc:"Sắc tím nhẹ nhàng, thơ mộng",price:49000,color:"Tím",tag:"Được yêu thích",img:"https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=800&q=85"},
 {name:"Forest Whisper",desc:"Lá xanh và hoa nhỏ phong cách thiên nhiên",price:45000,color:"Xanh",tag:"Natural",img:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=85"},
 {name:"Blue Sky",desc:"Hoa xanh dịu mát, thanh lịch",price:45000,color:"Xanh",tag:"Thanh lịch",img:"https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=85"},
 {name:"Golden Muse",desc:"Hoa vàng kem thanh lịch, cổ điển",price:49000,color:"Vàng",tag:"Vintage",img:"https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=85"}
];
let cart = [];
const money = n => n.toLocaleString("vi-VN") + "đ";
const productGrid = document.getElementById("productGrid");
function renderProducts(filter="Tất cả") {
  const visible = products.filter(p => filter === "Tất cả" || p.color === filter);
  productGrid.innerHTML = visible.map(p => `<article class="product-card">
    <div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,#ead9c5,#d9c5b2)'"><span class="product-tag">${p.tag}</span></div>
    <div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.name}">+ Thêm vào giỏ</button></div></div>
  </article>`).join("");
}
function renderCart() {
  document.getElementById("cartCount").textContent = cart.length;
  const items = document.getElementById("cartItems");
  if (!cart.length) {
    items.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống. Ghé bộ sưu tập để chọn một chiếc bookmark nhé ♡</p>';
  } else {
    items.innerHTML = cart.map((p,i) => `<div class="cart-row"><div><strong>${p.name}</strong><small>${p.desc}</small></div><span class="cart-price">${money(p.price)}</span><button class="remove-item" data-remove="${i}" aria-label="Xóa ${p.name}">✕</button></div>`).join("");
  }
  document.getElementById("cartTotal").textContent = money(cart.reduce((sum,p)=>sum+p.price,0));
}
renderProducts(); renderCart();
document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest("[data-filter]"); if (!btn) return;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active", b===btn)); renderProducts(btn.dataset.filter);
});
productGrid.addEventListener("click", e => {
  const btn=e.target.closest("[data-add]"); if(!btn)return;
  const p=products.find(x=>x.name===btn.dataset.add); if(p){cart.push(p);renderCart();btn.textContent="✓ Đã thêm";setTimeout(()=>btn.textContent="+ Thêm vào giỏ",1000);}
});
document.getElementById("cartItems").addEventListener("click", e => {
  const btn=e.target.closest("[data-remove]");if(!btn)return;cart.splice(Number(btn.dataset.remove),1);renderCart();
});
document.getElementById("clearCart").addEventListener("click",()=>{cart=[];renderCart();document.getElementById("orderOutput").hidden=true;});
document.getElementById("checkoutBtn").addEventListener("click",()=>{
  if(!cart.length){alert("Giỏ hàng đang trống. Bạn hãy chọn sản phẩm trước nhé!");return;}
  const msg = "Xin chào Bloommark! Mình muốn đặt các sản phẩm sau:\\n" + cart.map((p,i)=>`${i+1}. ${p.name} — ${money(p.price)}`).join("\\n") + `\\nTạm tính: ${money(cart.reduce((s,p)=>s+p.price,0))}\\nNhờ shop xác nhận phí giao hàng và thời gian nhận hàng. Cảm ơn shop!`;
  document.getElementById("orderMessage").value=msg;document.getElementById("orderOutput").hidden=false;
});
document.getElementById("copyOrder").addEventListener("click",async()=>{
  const text=document.getElementById("orderMessage").value;const status=document.getElementById("copyStatus");
  try{await navigator.clipboard.writeText(text);status.textContent="Đã sao chép nội dung đơn hàng.";}
  catch{document.getElementById("orderMessage").select();status.textContent="Hãy nhấn Ctrl+C để sao chép nội dung.";}
});
const giftCheck=document.getElementById("giftCheck"), giftLabel=document.getElementById("giftWrapLabel");
giftCheck.addEventListener("change",()=>giftLabel.hidden=!giftCheck.checked);
document.getElementById("customForm").addEventListener("submit",e=>{
  e.preventDefault();
  const color=document.querySelector('input[name="color"]:checked').value;
  const gender=document.querySelector('input[name="gender"]:checked').value;
  const gift=giftCheck.checked?document.getElementById("giftWrap").value:"Không cần đóng gói quà";
  const qty=Math.max(1,Math.min(50,Number(document.getElementById("customQty").value)||1));
  const msg=`YÊU CẦU THIẾT KẾ RIÊNG — BLOOMMARK\\nMẫu: ${document.getElementById("customProduct").value}\\nMàu sắc: ${color}\\nPhong cách: ${document.getElementById("customStyle").value}\\nDành cho: ${gender}\\nTên/thông điệp: ${document.getElementById("customName").value||"Chưa có"}\\nYêu cầu riêng: ${document.getElementById("customNote").value||"Chưa có"}\\nĐóng gói: ${gift}\\nSố lượng: ${qty}\\nLiên hệ: ${document.getElementById("customContact").value}\\n\\nNhờ shop tư vấn mẫu phù hợp và xác nhận giá cuối cùng.`;
  document.getElementById("orderMessage").value=msg;document.getElementById("orderOutput").hidden=false;document.getElementById("orderOutput").scrollIntoView({behavior:"smooth",block:"center"});
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();