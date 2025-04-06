import { configureStore } from "@reduxjs/toolkit";
import couponSlice from "../features/Coupon/couponSlice";
import PurchaseReturnListSlice from "../features/PurchaseReturnList/PurchaseReturnListSlice";
import SaleReturnListSlice from "../features/SaleReturnList/SaleReturnListSlice";
import accountReducer from "../features/account/accountSlice";
import adjustInventorySlice from "../features/adjustInventory/adjustInventorySlice";
import authSlice from "../features/auth/authSlice";
import awardSlice from "../features/award/awardSlice";
import awardHistorySlice from "../features/awardHistory/awardHistorySlice";
import cartReducer from "../features/cart/cartSlice";
import colorReducer from "../features/color/colorSlice";
import customerReducer from "../features/customer/customerSlice";
import customerPaymentReducer from "../features/customerPayment/customerPaymentSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import departmentSlice from "../features/department/departmentSlice";
import designationReducer from "../features/designation/designationSlice";
import designationHistorySlice from "../features/designationHistory/designationHistorySlice";
import cartDynamicSlice from "../features/eCommerce/cart/cartSlice";
import cartOrder from "../features/eCommerce/cartOrder/cartOrderSlice";
import categoryListSlice from "../features/eCommerce/categoryList/categoryListSlice";
import courierMediumSlice from "../features/eCommerce/courierMedium/courierMediumSlice";
import currencySlice from "../features/eCommerce/currency/currencySlice";
import customerECommerce from "../features/eCommerce/customer/customerSlice";
import deliveryFeeSlice from "../features/eCommerce/deliveryFee/deliveryFeeSlice";
import discountSlice from "../features/eCommerce/discount/discountSlice";
import productPublicRelatedSlice from "../features/eCommerce/product/productPublicRelatedSlice";
import productAttributeSlice from "../features/eCommerce/productAttribute/productAttribute";
import productAttributeValueSlice from "../features/eCommerce/productAttributeValue/productAttributeValueSlice";
import productPublicSearchSlice from "../features/eCommerce/productSearch/productSearchSlice";
import returnOrderSlice from "../features/eCommerce/returnOrder/returnOrderSlice";
import reviewRatingSlice from "../features/eCommerce/reviewRating/reviewRatingSlice";
import sliderSlice from "../features/eCommerce/slider/sliderSlice";
import wishlistSlice from "../features/eCommerce/wishlist/wishlistSlice";
import educationSlice from "../features/education/educationSlice";
import emailConfigSlice from "../features/emailConfig/emailConfigSlice";
import employeeStatusSlice from "../features/employeeStatus/employeeStatusSlice";
import holdSaleSlice from "../features/holdSale/holdSaleSlice";
import permissionSlice from "../features/hr/role/permissionSlice";
import roleSlice from "../features/hr/role/roleSlice";
import manualPaymentSlice from "../features/manualPayment/manualPaymentSlice";
import paymentMethodSlice from "../features/paymentMethod/paymentMethodSlice";
import printPageSlice from "../features/printPage/printPageSlice";
import productSearchSlice from "../features/product/productSearchSlice";
import productReducer from "../features/product/productSlice";
import onlineOrderReducer from "../features/online-order/onlineOrderSlice";
import productBrandReducer from "../features/productBrand/productBrandSlice";
import ProductSortListSlice from "../features/productSortList/ProductSortListSlice";
import bankListReducer from "../features/bankList/bankListSlice";
import productCategoryReducer from "../features/productCategory/productCategorySlice";
import productSubCategoryReducer from "../features/productSubCategory/productSubCategorySlice";
import productSubSubCategoryReducer from "../features/productSubSubCategory/productSubSubCategorySlice";
import purchaseReducer from "../features/purchase/purchaseSlice";
import purchaseOrderSlice from "../features/purchaseOrder/purchaseOrderSlice";
import quoteSlice from "../features/quote/quoteSlice";
import salaryHistorySlice from "../features/salaryHistory/salaryHistorySlice";
import saleReducer from "../features/sale/saleSlice";
import settingReducer from "../features/setting/settingSlice";
import shiftSlice from "../features/shift/shiftSlice";
import supplierReducer from "../features/supplier/supplierSlice";
import supplierPaymentReducer from "../features/supplierPayment/supplierPaymentSlice";
import termsAndConditionSlice from "../features/termsAndCondition/termsAndConditionSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import uomSlice from "../features/uom/uomSlice";
import userReducer from "../features/user/userSlice";
import vatTaxSlice from "../features/vatTax/vatTaxSlice";

// Add this import at the top with other imports
import dashboardStatsReducer from "../features/dashboard/dashboardStatsSlice";
import orderStatsReducer from "../features/dashboard/orderStatsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartDynamic: cartDynamicSlice,
    suppliers: supplierReducer,
    products: productReducer,
    onlineOrders: onlineOrderReducer,
    productSearch: productSearchSlice,
    purchases: purchaseReducer,
    purchaseReturn: PurchaseReturnListSlice,
    purchaseOrder: purchaseOrderSlice,
    customers: customerReducer,
    sales: saleReducer,
    saleReturn: SaleReturnListSlice,
    adjustInventory: adjustInventorySlice,
    users: userReducer,
    supplierPayments: supplierPaymentReducer,
    accounts: accountReducer,
    dashboard: dashboardReducer,
    dashboardStats: dashboardStatsReducer,  // Add this line
    orderStats: orderStatsReducer,
    transactions: transactionReducer,
    bankLists: bankListReducer,
    productCategories: productCategoryReducer,
    productSubCategories: productSubCategoryReducer,
    productSubSubCategories: productSubSubCategoryReducer,
    productBrands: productBrandReducer,
    designations: designationReducer,
    colors: colorReducer,
    customerPayments: customerPaymentReducer,
    vatTax: vatTaxSlice,
    role: roleSlice,
    permission: permissionSlice,
    setting: settingReducer,
    productSortList: ProductSortListSlice,
    coupon: couponSlice,
    print: printPageSlice,
    holdSale: holdSaleSlice,
    quote: quoteSlice,
    salaryHistory: salaryHistorySlice,
    designationHistory: designationHistorySlice,
    award: awardSlice,
    awardHistory: awardHistorySlice,
    education: educationSlice,
    department: departmentSlice,
    shift: shiftSlice,
    employmentStatus: employeeStatusSlice,
    emailConfig: emailConfigSlice,
    uom: uomSlice,
    termsAndConditions: termsAndConditionSlice,
    // e-commerce slice
    customerECommerce: customerECommerce,
    courierMedium: courierMediumSlice,
    currency: currencySlice,
    discount: discountSlice,
    reviewRating: reviewRatingSlice,
    productAttribute: productAttributeSlice,
    productAttributeValue: productAttributeValueSlice,
    categoryList: categoryListSlice,
    productPublicRelated: productPublicRelatedSlice,
    productPublicSearch: productPublicSearchSlice,
    slider: sliderSlice,
    wishlist: wishlistSlice,
    ESale: cartOrder,
    auth: authSlice,
    manualPayment: manualPaymentSlice,
    paymentMethod: paymentMethodSlice,
    returnOrder: returnOrderSlice,
    deliveryFee: deliveryFeeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "product/loadSingleProduct/fulfilled",
          "vatTax/loadVatTaxStatement/fulfilled",
          "transaction/deleteStaff/fulfilled",
          "productCategory/loadSingleProductCategory/fulfilled",
          "productSubCategory/loadSingleProductSubCategory/fulfilled",
          "productBrand/loadSingleProductBrand/fulfilled",
          "supplier/loadSupplier/fulfilled",
          "customer/loadSingleCustomer/fulfilled",
          "sale/loadSingleSale/fulfilled",
          "user/loadSingleStaff/fulfilled",
          "designation/loadSingleDesignation/fulfilled",
          "user/loadSingleStaff/fulfilled",
        ],
      },
    }).concat(),
});

export default store;
