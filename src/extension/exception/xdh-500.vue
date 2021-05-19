<template>
  <xdh-exception
    description="很抱歉，服务器出错了"
    :img="img"
  >
  </xdh-exception>
</template>

<script>
import XdhException from "./components/xdh-exception";

export default {
  name: "Xdh405",
  components: {
    XdhException
  },
  data() {
    return {
      img: require("./img/500.svg")
    };
  }
};
</script>
