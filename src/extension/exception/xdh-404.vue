<template>
  <xdh-exception
    description="很抱歉，你访问的页面不存在"
    :img="img"
  >
  </xdh-exception>
</template>

<script>
import XdhException from "./components/xdh-exception";

export default {
  name: "Xdh404",
  components: {
    XdhException
  },
  data() {
    return {
      img: require("./img/404.svg")
    };
  }
};
</script>
