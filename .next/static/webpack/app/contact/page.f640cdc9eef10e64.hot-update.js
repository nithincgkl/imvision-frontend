"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/contact/page",{

/***/ "(app-pages-browser)/./src/layouts/headers/MobileMenu.tsx":
/*!********************************************!*\
  !*** ./src/layouts/headers/MobileMenu.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nconst menu_data = [\n    {\n        id: 1,\n        title: \"Events\",\n        link: \"/events\",\n        has_dropdown: false\n    },\n    {\n        id: 2,\n        title: \"Expo\",\n        link: \"/expo\",\n        has_dropdown: false\n    },\n    {\n        id: 3,\n        title: \"Installation\",\n        link: \"/installation\",\n        has_dropdown: false\n    },\n    // { id: 4, title: \"Sale\", link: '/sale', has_dropdown: false },\n    {\n        id: 5,\n        title: \"Installation\",\n        link: \"/installation\",\n        has_dropdown: false\n    },\n    {\n        id: 6,\n        title: \"Contact\",\n        link: \"/contact\",\n        has_dropdown: false\n    },\n    {\n        id: 6,\n        title: \"Suppo\",\n        link: \"/contact\",\n        has_dropdown: false\n    },\n    {\n        id: 7,\n        title: \"Sign In\",\n        link: \"/sign-in\",\n        has_dropdown: false\n    },\n    {\n        id: 8,\n        title: \"\\uD83D\\uDED2 Cart\",\n        link: \"/Cart\",\n        has_dropdown: false\n    }\n];\nconst MobileMenu = (param)=>{\n    let { active, navTitle, openMobileMenu } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n        className: \"cs_nav_list\",\n        style: {\n            display: active ? \"block\" : \"none\"\n        },\n        children: menu_data.map((menu)=>{\n            var _menu_sub_menu;\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                className: \"\".concat(menu.has_dropdown ? \"menu-item-has-children\" : \"\", \" \").concat(navTitle === menu.title ? \"active\" : \"\"),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        href: menu.link,\n                        children: menu.title\n                    }, void 0, false, {\n                        fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                        lineNumber: 37,\n                        columnNumber: 11\n                    }, undefined),\n                    menu.has_dropdown && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                className: \"cs_mega_wrapper\",\n                                style: {\n                                    display: navTitle === menu.title ? \"block\" : \"none\"\n                                },\n                                children: (_menu_sub_menu = menu.sub_menu) === null || _menu_sub_menu === void 0 ? void 0 : _menu_sub_menu.map((subMenu)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                            href: subMenu.link,\n                                            children: subMenu.title\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                            lineNumber: 43,\n                                            columnNumber: 21\n                                        }, undefined)\n                                    }, subMenu.id, false, {\n                                        fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                        lineNumber: 42,\n                                        columnNumber: 19\n                                    }, undefined))\n                            }, void 0, false, {\n                                fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                lineNumber: 40,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                onClick: ()=>openMobileMenu(menu.title),\n                                className: \"cs_munu_dropdown_toggle \".concat(navTitle === menu.title ? \"active\" : \"\")\n                            }, void 0, false, {\n                                fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                lineNumber: 47,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true)\n                ]\n            }, menu.id, true, {\n                fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                lineNumber: 36,\n                columnNumber: 9\n            }, undefined);\n        })\n    }, void 0, false, {\n        fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, undefined);\n};\n_c = MobileMenu;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MobileMenu);\nvar _c;\n$RefreshReg$(_c, \"MobileMenu\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9sYXlvdXRzL2hlYWRlcnMvTW9iaWxlTWVudS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRTZCO0FBQ1c7QUFVeEMsTUFBTUUsWUFBd0I7SUFDNUI7UUFBRUMsSUFBSTtRQUFHQyxPQUFPO1FBQVVDLE1BQU07UUFBV0MsY0FBYztJQUFNO0lBQy9EO1FBQUVILElBQUk7UUFBR0MsT0FBTztRQUFRQyxNQUFNO1FBQVNDLGNBQWM7SUFBTTtJQUMzRDtRQUFFSCxJQUFJO1FBQUdDLE9BQU87UUFBZ0JDLE1BQU07UUFBaUJDLGNBQWM7SUFBTTtJQUMzRSxnRUFBZ0U7SUFDaEU7UUFBRUgsSUFBSTtRQUFHQyxPQUFPO1FBQWdCQyxNQUFNO1FBQWlCQyxjQUFjO0lBQU07SUFDM0U7UUFBRUgsSUFBSTtRQUFHQyxPQUFPO1FBQVdDLE1BQU07UUFBWUMsY0FBYztJQUFNO0lBQ2pFO1FBQUVILElBQUk7UUFBR0MsT0FBTztRQUFTQyxNQUFNO1FBQVlDLGNBQWM7SUFBTTtJQUMvRDtRQUFFSCxJQUFJO1FBQUdDLE9BQU87UUFBV0MsTUFBTTtRQUFZQyxjQUFjO0lBQU07SUFDakU7UUFBRUgsSUFBSTtRQUFHQyxPQUFPO1FBQVdDLE1BQU07UUFBU0MsY0FBYztJQUFNO0NBQy9EO0FBUUQsTUFBTUMsYUFBd0M7UUFBQyxFQUFFQyxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsY0FBYyxFQUFFO0lBQ2pGLHFCQUNFLDhEQUFDQztRQUFHQyxXQUFVO1FBQWNDLE9BQU87WUFBRUMsU0FBU04sU0FBUyxVQUFVO1FBQU87a0JBQ3JFTixVQUFVYSxHQUFHLENBQUMsQ0FBQ0M7Z0JBTUxBO2lDQUxULDhEQUFDQztnQkFBaUJMLFdBQVcsR0FBd0RILE9BQXJETyxLQUFLVixZQUFZLEdBQUcsMkJBQTJCLElBQUcsS0FBMkMsT0FBeENHLGFBQWFPLEtBQUtaLEtBQUssR0FBRyxXQUFXOztrQ0FDeEgsOERBQUNKLGlEQUFJQTt3QkFBQ2tCLE1BQU1GLEtBQUtYLElBQUk7a0NBQUdXLEtBQUtaLEtBQUs7Ozs7OztvQkFDakNZLEtBQUtWLFlBQVksa0JBQ2hCOzswQ0FDRSw4REFBQ0s7Z0NBQUdDLFdBQVU7Z0NBQWtCQyxPQUFPO29DQUFFQyxTQUFTTCxhQUFhTyxLQUFLWixLQUFLLEdBQUcsVUFBVTtnQ0FBTzsyQ0FDMUZZLGlCQUFBQSxLQUFLRyxRQUFRLGNBQWJILHFDQUFBQSxlQUFlRCxHQUFHLENBQUMsQ0FBQ0ssd0JBQ25CLDhEQUFDSDtrREFDQyw0RUFBQ2pCLGlEQUFJQTs0Q0FBQ2tCLE1BQU1FLFFBQVFmLElBQUk7c0RBQUdlLFFBQVFoQixLQUFLOzs7Ozs7dUNBRGpDZ0IsUUFBUWpCLEVBQUU7Ozs7Ozs7Ozs7MENBS3ZCLDhEQUFDa0I7Z0NBQUtDLFNBQVMsSUFBTVosZUFBZU0sS0FBS1osS0FBSztnQ0FBR1EsV0FBVywyQkFBbUUsT0FBeENILGFBQWFPLEtBQUtaLEtBQUssR0FBRyxXQUFXOzs7Ozs7Ozs7ZUFYekhZLEtBQUtiLEVBQUU7Ozs7Ozs7Ozs7O0FBa0J4QjtLQXRCTUk7QUF3Qk4sK0RBQWVBLFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2xheW91dHMvaGVhZGVycy9Nb2JpbGVNZW51LnRzeD83ZTM2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgTWVudUl0ZW0ge1xuICBpZDogbnVtYmVyO1xuICB0aXRsZTogc3RyaW5nO1xuICBsaW5rOiBzdHJpbmc7XG4gIGhhc19kcm9wZG93bjogYm9vbGVhbjtcbiAgc3ViX21lbnU/OiB7IGlkOiBudW1iZXI7IHRpdGxlOiBzdHJpbmc7IGxpbms6IHN0cmluZyB9W107XG59XG5cbmNvbnN0IG1lbnVfZGF0YTogTWVudUl0ZW1bXSA9IFtcbiAgeyBpZDogMSwgdGl0bGU6IFwiRXZlbnRzXCIsIGxpbms6ICcvZXZlbnRzJywgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiAyLCB0aXRsZTogXCJFeHBvXCIsIGxpbms6ICcvZXhwbycsIGhhc19kcm9wZG93bjogZmFsc2UgfSxcbiAgeyBpZDogMywgdGl0bGU6IFwiSW5zdGFsbGF0aW9uXCIsIGxpbms6ICcvaW5zdGFsbGF0aW9uJywgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICAvLyB7IGlkOiA0LCB0aXRsZTogXCJTYWxlXCIsIGxpbms6ICcvc2FsZScsIGhhc19kcm9wZG93bjogZmFsc2UgfSxcbiAgeyBpZDogNSwgdGl0bGU6IFwiSW5zdGFsbGF0aW9uXCIsIGxpbms6ICcvaW5zdGFsbGF0aW9uJywgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiA2LCB0aXRsZTogXCJDb250YWN0XCIsIGxpbms6IFwiL2NvbnRhY3RcIiwgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiA2LCB0aXRsZTogXCJTdXBwb1wiLCBsaW5rOiBcIi9jb250YWN0XCIsIGhhc19kcm9wZG93bjogZmFsc2UgfSxcbiAgeyBpZDogNywgdGl0bGU6IFwiU2lnbiBJblwiLCBsaW5rOiBcIi9zaWduLWluXCIsIGhhc19kcm9wZG93bjogZmFsc2UgfSxcbiAgeyBpZDogOCwgdGl0bGU6IFwi8J+bkiBDYXJ0XCIsIGxpbms6IFwiL0NhcnRcIiwgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuXTtcblxuaW50ZXJmYWNlIE1vYmlsZU1lbnVQcm9wcyB7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgbmF2VGl0bGU6IHN0cmluZztcbiAgb3Blbk1vYmlsZU1lbnU6ICh0aXRsZTogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5jb25zdCBNb2JpbGVNZW51OiBSZWFjdC5GQzxNb2JpbGVNZW51UHJvcHM+ID0gKHsgYWN0aXZlLCBuYXZUaXRsZSwgb3Blbk1vYmlsZU1lbnUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDx1bCBjbGFzc05hbWU9XCJjc19uYXZfbGlzdFwiIHN0eWxlPXt7IGRpc3BsYXk6IGFjdGl2ZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiIH19PlxuICAgICAge21lbnVfZGF0YS5tYXAoKG1lbnUpID0+IChcbiAgICAgICAgPGxpIGtleT17bWVudS5pZH0gY2xhc3NOYW1lPXtgJHttZW51Lmhhc19kcm9wZG93biA/IFwibWVudS1pdGVtLWhhcy1jaGlsZHJlblwiIDogXCJcIn0gJHtuYXZUaXRsZSA9PT0gbWVudS50aXRsZSA/IFwiYWN0aXZlXCIgOiBcIlwifWB9PlxuICAgICAgICAgIDxMaW5rIGhyZWY9e21lbnUubGlua30+e21lbnUudGl0bGV9PC9MaW5rPlxuICAgICAgICAgIHttZW51Lmhhc19kcm9wZG93biAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY3NfbWVnYV93cmFwcGVyXCIgc3R5bGU9e3sgZGlzcGxheTogbmF2VGl0bGUgPT09IG1lbnUudGl0bGUgPyBcImJsb2NrXCIgOiBcIm5vbmVcIiB9fT5cbiAgICAgICAgICAgICAgICB7bWVudS5zdWJfbWVudT8ubWFwKChzdWJNZW51KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8bGkga2V5PXtzdWJNZW51LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17c3ViTWVudS5saW5rfT57c3ViTWVudS50aXRsZX08L0xpbms+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiBvcGVuTW9iaWxlTWVudShtZW51LnRpdGxlKX0gY2xhc3NOYW1lPXtgY3NfbXVudV9kcm9wZG93bl90b2dnbGUgJHtuYXZUaXRsZSA9PT0gbWVudS50aXRsZSA/IFwiYWN0aXZlXCIgOiBcIlwifWB9Pjwvc3Bhbj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvbGk+XG4gICAgICApKX1cbiAgICA8L3VsPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9iaWxlTWVudTsiXSwibmFtZXMiOlsiTGluayIsIlJlYWN0IiwibWVudV9kYXRhIiwiaWQiLCJ0aXRsZSIsImxpbmsiLCJoYXNfZHJvcGRvd24iLCJNb2JpbGVNZW51IiwiYWN0aXZlIiwibmF2VGl0bGUiLCJvcGVuTW9iaWxlTWVudSIsInVsIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJkaXNwbGF5IiwibWFwIiwibWVudSIsImxpIiwiaHJlZiIsInN1Yl9tZW51Iiwic3ViTWVudSIsInNwYW4iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/layouts/headers/MobileMenu.tsx\n"));

/***/ })

});