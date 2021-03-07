<template>
  <div class="addressbook">
    <van-index-bar>
      <div
        v-for="(item, index) in namesList"
        :key="index"
        class="">
        <van-index-anchor :index="item.letter" />
        <van-cell
          v-for="(name, index) in item.data"
          :key="index"
          :title="name" />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { pySegSort } from '@/utils/utils'
export default {
  methods: {
    ...mapMutations({
      changeTitle: 'SET_TITLE',
      changeType: 'SET_NAVTYPE'
    })
  },
  computed: {
    namesList () {
      return pySegSort(this.names)
    }
  },
  created () {
    this.changeTitle('通讯录')
    this.changeType('index')
  },
  data () {
    return {
      names: ['萧案说','阿萨达','发我额','你妈的','檀君哈','小智接','叶澄五','胜多负','别摸我','是你吗','从生宿','欧式']
    }
  }
}
</script>

<style>

</style>