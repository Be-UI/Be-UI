<template>
  <be-container style="margin-bottom: 20px">
    <be-header class="header-footer-class pink-500">梨花淡白柳深青《header》</be-header>
    <be-container>
      <be-aside width="200px" class="left-class green-100">
        <p>《aside》</p>
        柳絮飞时花满城
      </be-aside>
      <be-container>
        <be-main class="main-class pink-100">惆怅东栏一株雪《main》
        </be-main>
        <be-footer class="header-footer-class pink-500">《footer》人生看得几清明
        </be-footer>
      </be-container>
    </be-container>
  </be-container>
</template>
<style>
.pink-500{
  background-color: rgba(253,242,248,1);
}
.pink-100{
  background-color: rgb(251, 196, 196);
}
.green-100{
  background-color: #e9faf6;
}
.header-footer-class{
  text-align: center;
  line-height: 60px;
}
.main-class{
  line-height: 160px;
  text-align: center;
}
.left-class{
  text-align: center;
  line-height: 320px;
}
</style>
