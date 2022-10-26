<script setup lang="ts"></script>

<template>
  <div class="modal">
    <slot name="closeZone"> </slot>
    <slot name="commentArea"> </slot>
    <slot name="comments"> </slot>
  </div>
  <div class="overlay"></div>
</template>

<style>
.hidden {
  display: none;
}

.close_zone {
  position: sticky;
  background-color: black;
  top: 0px;
  width: 100%;
  height: 60px;
  z-index: 950;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1000;
}

.comment_area {
  position: relative;
  margin-bottom: 20px;
  z-index: 900;
}

.text_area {
  width: 100%;
  height: 100%;
  padding: 10px 95px 100px 10px;
  background-color: rgb(40, 40, 40);
  border-radius: 4px;
  border: none;
  color: white;
  resize: none;
  font-size: 14px;
}

.text_area:focus {
  border: 1px solid rgb(240, 72, 110);
}

.comment_count {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  font-size: 14px;
}

.btn_output {
  position: absolute;
  bottom: 15px;
  right: 10px;
  padding: 5px 12px;
  cursor: pointer;
  text-align: center;
  width: 60px;
  height: 35px;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  background-color: rgb(240, 72, 110);
}

.btn_delete {
  cursor: pointer;
  background: none;
  border: none;
  color: gray;
}

.btn_delete:hover {
  color: white;
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
  overflow-y: scroll;
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
