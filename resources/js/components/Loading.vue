<template>
  <div id="loading">
    <svg
      id="animation_loader"
      :class="size"
      preserveAspectRatio="xMinYMin meet"
      version="1.1"
      viewBox="0 0 512 490"
    >
      <ellipse id="shadow" cx="256" cy="389.8" rx="87.4" ry="9.8" />
      <g id="circle">
        <circle id="circleBG" cx="256" cy="256" r="99.5" />
        <path
          id="circleFG"
          d="M327.3,296.7c-28.1,43.5-93,64.8-134.2,37.7c-36.2-23.7-36.7-73.3-36.7-78.4
		c0-7.5,1-43.3,30.1-71.5c26.2-25.5,58-27.8,69.4-28c9.3-0.1,43.6-0.6,67.1,23.7C352.3,210.4,349.2,262.9,327.3,296.7z"
        />
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
