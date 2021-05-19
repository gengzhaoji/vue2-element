<template>
  <xdh-exception
    description="很抱歉，你无权访问该页面"
    :img="img"
  >
  </xdh-exception>
</template>

<script>
import XdhException from "./components/xdh-exception";

export default {
  name: "Xdh403",
  components: {
    XdhException
  },
  data() {
    return {
      img: require("./img/403.svg")
    };
  }
};
</script>
