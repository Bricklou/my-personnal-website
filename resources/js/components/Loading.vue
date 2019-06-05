<template>
  <div id="loading">
    <svg
      id="animation_loader"
      :class="size"
      preserveAspectRatio="xMinYMin meet"
      version="1.1"
      viewBox="0 0 512 490"
    >
      <ellipse id="shadow" cx="256" cy="389.8" rx="87.4" ry="9.8" vector-effect="non-scaling-stroke" />
      <g id="circle">
        <circle id="circleBG" cx="256.05" cy="255.52" r="99.5" fill="#00bfff" vector-effect="non-scaling-stroke" />
        <path id="circleFG" d="m327.35 296.22c-28.1 43.5-93 64.8-134.2 37.7-36.2-23.7-36.7-73.3-36.7-78.4 0-7.5 1-43.3 30.1-71.5 26.2-25.5 58-27.8 69.4-28 9.3-0.1 43.6-0.6 67.1 23.7 29.3 30.2 26.2 82.7 4.3 116.5z" fill="#87ceeb" />
        <clipPath id="b">
          <path d="m155.55 136h200v200h-200v-200z" fill="#fff" />
        </clipPath>
        <path d="m310.59 234.93c-0.311-0.71-7.89-17.353-23.458-17.353-15.563 0-23.142 16.643-23.458 17.353-0.484 1.09-0.168 2.363 0.758 3.111 0.921 0.747 2.242 0.773 3.216 0.073 0.063-0.047 6.642-4.747 19.484-4.747 12.768 0 19.337 4.637 19.484 4.742 0.463 0.347 1.021 0.521 1.569 0.521 0.579 0 1.163-0.195 1.642-0.574 0.931-0.747 1.252-2.031 0.763-3.126z" fill="#464646" />
        <path d="m247.43 234.93c-0.316-0.71-7.89-17.353-23.458-17.353-15.563 0-23.142 16.643-23.458 17.353-0.484 1.09-0.168 2.363 0.758 3.111 0.926 0.747 2.247 0.773 3.211 0.073 0.068-0.047 6.642-4.747 19.489-4.747 12.768 0 19.337 4.637 19.484 4.742 0.463 0.347 1.021 0.521 1.569 0.521 0.579 0 1.163-0.195 1.642-0.574 0.937-0.747 1.247-2.031 0.763-3.126z" fill="#464646" />
        <path d="m255.55 257.05c-19.068 0-31.721-2.221-47.368-5.264-3.574-0.689-10.527 0-10.527 10.527 0 21.052 24.184 47.368 57.895 47.368 33.705 0 57.895-26.316 57.895-47.368 0-10.527-6.953-11.221-10.527-10.527-15.647 3.043-28.3 5.264-47.368 5.264z" fill="#464646" />
        <path d="m208.18 262.32s15.789 5.263 47.368 5.263 47.368-5.263 47.368-5.263-10.526 21.052-47.368 21.052-47.368-21.052-47.368-21.052z" fill="#fff" />
      </g>
    </svg>
    <h1
      v-if="text"
      id="title_text"
      class="title is-3 has-text-weight-semibold"
    >
      {{ text.toUpperCase() }}
    </h1>
    <p id="loading_text">
      Chargement...
    </p>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      text: {
        type: String,
        default: null,
        required: false
      },
      size: {
        type: String,
        default: "",
        validator: value => {
          // Only accepts values that contain the string 'cookie-dough'.
          return ["big"].includes(value) !== -1;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
#loading {
  align-self: center;
  height: fit-content;
  margin: auto;
  position: absolute;
  text-align: center;
  width: 100%;

  #animation_loader {
    bottom: 0;
    height: 150px;
    width: 150px;

    &.big {
      height: 250px !important;
      width: 250px !important;
    }

    #circle {
      animation-direction: alternate;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: floating;
      animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    #circleBG {
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-name: colorBG;
      fill: deepskyblue;
    }

    #circleFG {
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-name: colorFG;
      fill: skyblue;
    }

    #shadow {
      animation-direction: alternate;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: shadow;
      animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      fill: #27281f;
      transform-origin: 50% 50%;
    }
  }

  #title_text {
    margin: 0;
    position: relative;
    text-align: center;
    top: -30px;
    width: auto;
  }

  #loading_text {
    font-weight: 500;
    margin: 0;
    position: relative;
    text-align: center;
    top: -25px;
  }

  @keyframes colorFG {

    0% {
      fill: skyblue;
    }

    25% {
      fill: darkseagreen;
    }

    50% {
      fill: indianred;
    }

    75% {
      fill: #faea73;
    }
  }

  @keyframes colorBG {

    0% {
      fill: deepskyblue;
    }

    25% {
      fill: seagreen;
    }

    50% {
      fill: darkred;
    }

    75% {
      fill: orange;
    }
  }

  @keyframes floating {

    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      transform: translate3d(0, -20px, 0);
    }
  }

  @keyframes shadow {

    from {
      fill: #292929;
      transform: scale3d(1, 1, 1);
    }

    to {
      fill: #3e4032;
      transform: scale3d(0.75, 1, 1);
    }
  }
}
</style>
