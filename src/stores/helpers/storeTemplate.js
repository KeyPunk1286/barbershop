import DbOperations from './DbOperations'
import { ref, computed } from 'vue'
export default function getStoreTemplate(collectionTitle, generalApiOperation) {
  const collectionDB = new DbOperations(collectionTitle)
  const itemsList = ref(null)
  const currentItem = ref(null)
  //==============================
  const idItemNameOrder = ref(null)
  const orderList = ref([])
  //==============================
  const mastersList = ref(null)
  const listServices = ref(null)
  //==============================
  async function loadItemsList() {
    itemsList.value = await generalApiOperation({
      operation: () => collectionDB.loadItemsList()
    })
  }
  //========== loadets items ========================
  async function loadMastersItemsList() {
    mastersList.value = await generalApiOperation({
      operation: () => collectionDB.loadItemsList()
    })
  }
  async function loadServicesItemsList() {
    listServices.value = await generalApiOperation({
      operation: () => collectionDB.loadItemsList()
    })
  }
  //==================================================
  async function loadItemById(itemId) {
    currentItem.value = await generalApiOperation({
      operation: () => collectionDB.getItemById(itemId)
    })
    return currentItem.value
  }
  async function loadFilteredData(fieldTitle, compareOperator, valueToCompare) {
    itemsList.value = await generalApiOperation({
      operation: () => collectionDB.loadFilteredData(fieldTitle, compareOperator, valueToCompare)
    })
    return itemsList.value
  }
  //==============================================================================================
  async function loadItemByNameOrder(name) {
    idItemNameOrder.value = await generalApiOperation({
      operation: () => collectionDB.loadFilteredData('nameOrder', '==', name)
    })
    // return idItemNameOrder.value.length > 0 ? idItemNameOrder.value[0].id : null
    if (idItemNameOrder.value.length > 0) return idItemNameOrder.value
    else return null
  }
  async function loadFilteredOrderLIst(fieldTitle, compareOperator, valueToCompare) {
    orderList.value = await generalApiOperation({
      operation: () => collectionDB.loadFilteredData(fieldTitle, compareOperator, valueToCompare)
    })
    return orderList.value
  }

  //==============================================================================================
  async function loadDocumentsFromIdsList(idsList) {
    itemsList.value = await generalApiOperation({
      operation: () => collectionDB.loadDocumentsFromIdsList(idsList)
    })
    return itemsList.value
  }
  async function addItem(itemData) {
    currentItem.value = await generalApiOperation({
      operation: () => collectionDB.addItem(itemData)
    })
  }
  async function addItemToArray(id, arrayProperty, itemData) {
    currentItem.value = await generalApiOperation({
      operation: () => collectionDB.addItemToArray(id, arrayProperty, itemData)
    })
  }
  async function removeItemFromArray(id, arrayProperty, itemData) {
    currentItem.value = await generalApiOperation({
      operation: () => collectionDB.removeItemFromArray(id, arrayProperty, itemData)
    })
  }
  async function addItemWithCustomId({ id, data }) {
    currentItem.value = await generalApiOperation({
      operation: () => collectionDB.addItemWithCustomId(id, data)
    })
  }
  //====================================================================
  // async function updateItem(id, data) {
  //   const product = itemsList.value.find((item) => item.id == id)
  //   if (product) Object.assign(product, data)
  //   console.log('product')
  //   console.log(product)
  //   currentItem.value = await generalApiOperation({
  //     operation: () => collectionDB.updateItem(id, data)
  //   })
  // }
  async function updateItem(id, data) {
    currentItem.value = await generalApiOperation({
      operation: () => collectionDB.updateItem(id, data)
    })
  }
  //=============== updateItemOredrList ===========//
  async function updateItemOredrList(id, data) {
    currentItem.value = await generalApiOperation({
      operation: () => collectionDB.updateItem(id, data)
    })
    const orderItem = orderList.value.find((item) => item.id == id)
    if (orderItem) {
      orderItem.numberPosition = data.numberPosition
    }
  }
  //=============== ================== ===========//
  async function deleteItem(itemId) {
    await generalApiOperation({
      operation: () => collectionDB.deleteItem(itemId)
    })
    itemsList.value = itemsList.value.filter((item) => item.id !== itemId)
  }
  //=============== delete for orderslist================================//
  async function deleteOrderItem(itemId) {
    await generalApiOperation({
      operation: () => collectionDB.deleteItem(itemId)
    })
    orderList.value = orderList.value.filter((item) => item.id !== itemId)
  }
  function resetOrderList() {
    orderList.value.splice(0, orderList.value.length)
  }
  //==================== default getters ================================//

  const getItemsList = computed(() => itemsList.value ?? [])
  const getCurrentItem = computed(() => currentItem.value)

  const getIdItemOrder = computed(() => {
    return idItemNameOrder.value && idItemNameOrder.value.length > 0
      ? idItemNameOrder.value[0].id
      : null
  })
  //================================================//
  const getOrdersList = computed(() => orderList.value ?? [])
  const getTotalSumOrderList = computed(() =>
    orderList.value.reduce((total, item) => total + item.priceOrder * item.numberPosition, 0)
  )
  //================= getter for Editior =========//
  const objPositionItem = ref({})
  function loadPositionItemById(positionId) {
    objPositionItem.value = itemsList.value.find((item) => item.id === positionId)
  }
  //================== geters for masters==============================//
  const getMastersList = computed(() => mastersList.value ?? [])
  //================== geters for services =======================//
  const getServicesList = computed(() => listServices.value ?? [])

  return {
    loadItemsList,
    addItem,
    addItemWithCustomId,
    addItemToArray,
    removeItemFromArray,
    updateItem,
    deleteItem,
    getItemsList,
    loadItemById,
    loadFilteredData,
    getCurrentItem,
    loadDocumentsFromIdsList,

    //=====================
    loadItemByNameOrder,
    getIdItemOrder,
    //========= forOrderList ============
    getOrdersList,
    getTotalSumOrderList,
    loadFilteredOrderLIst,
    deleteOrderItem,
    updateItemOredrList,
    resetOrderList,
    //========== for cart ===============
    currentItem,
    //========== for editor =========
    loadPositionItemById,
    objPositionItem,
    //=========== mstersList =======
    loadMastersItemsList,
    getMastersList,
    //=========== servicesList =====
    loadServicesItemsList,
    getServicesList
  }
}
