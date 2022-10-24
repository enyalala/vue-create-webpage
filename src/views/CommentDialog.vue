<script></script>

<template>
  <div class="modal">
    <div class="close_zone">
      <div class="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
    </div>
    <h1>I'm a modal window 😍</h1>
    <p></p>
  </div>
  <div class="overlay"></div>
</template>

<style>
.close_zone {
  position: sticky;
  top: 0px;
  width: 100%;
  height: 60px;
  margin-right: 10px;
  z-index: 950;
}
.close {
  position: sticky;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
  z-index: 1000;
}

.modal {
  position: fixed;
  left: 30%;
  width: 40%;
  height: 700px;

  background-color: black;
  padding: 0px 20px 20px;
  border-radius: 6px;
  border: 1px solid rgb(75, 75, 75);
  z-index: 900;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 800;
}
</style>
