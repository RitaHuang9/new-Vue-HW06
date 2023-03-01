<template>
  <nav class="navbar navbar-expand-lg bg-light py-3 sticky-top">
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink :to="{ name: 'productList' }" class="me-4">產品列表 </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'cartsList' }" class="me-4">購物車</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/login">管理者登入</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-3">
    <router-view></router-view>
  </div>
</template>
