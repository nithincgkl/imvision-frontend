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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nconst menu_data = [\n    {\n        id: 1,\n        title: \"Events\",\n        link: \"/events\",\n        has_dropdown: false\n    },\n    {\n        id: 2,\n        title: \"Ex\",\n        link: \"/fair\",\n        has_dropdown: false\n    },\n    {\n        id: 3,\n        title: \"Studios\",\n        link: \"/studios\",\n        has_dropdown: false\n    },\n    {\n        id: 4,\n        title: \"Sale\",\n        link: \"/sale\",\n        has_dropdown: false\n    },\n    {\n        id: 5,\n        title: \"Installation\",\n        link: \"/installation\",\n        has_dropdown: false\n    },\n    {\n        id: 6,\n        title: \"Contact\",\n        link: \"/contact\",\n        has_dropdown: false\n    },\n    {\n        id: 7,\n        title: \"Sign In\",\n        link: \"/sign-in\",\n        has_dropdown: false\n    },\n    {\n        id: 8,\n        title: \"\\uD83D\\uDED2 Cart\",\n        link: \"/Cart\",\n        has_dropdown: false\n    }\n];\nconst MobileMenu = (param)=>{\n    let { active, navTitle, openMobileMenu } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n        className: \"cs_nav_list\",\n        style: {\n            display: active ? \"block\" : \"none\"\n        },\n        children: menu_data.map((menu)=>{\n            var _menu_sub_menu;\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                className: \"\".concat(menu.has_dropdown ? \"menu-item-has-children\" : \"\", \" \").concat(navTitle === menu.title ? \"active\" : \"\"),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        href: menu.link,\n                        children: menu.title\n                    }, void 0, false, {\n                        fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 11\n                    }, undefined),\n                    menu.has_dropdown && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                className: \"cs_mega_wrapper\",\n                                style: {\n                                    display: navTitle === menu.title ? \"block\" : \"none\"\n                                },\n                                children: (_menu_sub_menu = menu.sub_menu) === null || _menu_sub_menu === void 0 ? void 0 : _menu_sub_menu.map((subMenu)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                            href: subMenu.link,\n                                            children: subMenu.title\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                            lineNumber: 42,\n                                            columnNumber: 21\n                                        }, undefined)\n                                    }, subMenu.id, false, {\n                                        fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                        lineNumber: 41,\n                                        columnNumber: 19\n                                    }, undefined))\n                            }, void 0, false, {\n                                fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                lineNumber: 39,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                onClick: ()=>openMobileMenu(menu.title),\n                                className: \"cs_munu_dropdown_toggle \".concat(navTitle === menu.title ? \"active\" : \"\")\n                            }, void 0, false, {\n                                fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                                lineNumber: 46,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true)\n                ]\n            }, menu.id, true, {\n                fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n                lineNumber: 35,\n                columnNumber: 9\n            }, undefined);\n        })\n    }, void 0, false, {\n        fileName: \"C:\\\\WORK\\\\imvision.se\\\\src\\\\layouts\\\\headers\\\\MobileMenu.tsx\",\n        lineNumber: 33,\n        columnNumber: 5\n    }, undefined);\n};\n_c = MobileMenu;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MobileMenu);\nvar _c;\n$RefreshReg$(_c, \"MobileMenu\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9sYXlvdXRzL2hlYWRlcnMvTW9iaWxlTWVudS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRTZCO0FBQ1c7QUFVeEMsTUFBTUUsWUFBd0I7SUFDNUI7UUFBRUMsSUFBSTtRQUFHQyxPQUFPO1FBQVVDLE1BQU07UUFBV0MsY0FBYztJQUFNO0lBQy9EO1FBQUVILElBQUk7UUFBR0MsT0FBTztRQUFNQyxNQUFNO1FBQVNDLGNBQWM7SUFBTTtJQUN6RDtRQUFFSCxJQUFJO1FBQUdDLE9BQU87UUFBV0MsTUFBTTtRQUFZQyxjQUFjO0lBQU07SUFDakU7UUFBRUgsSUFBSTtRQUFHQyxPQUFPO1FBQVFDLE1BQU07UUFBU0MsY0FBYztJQUFNO0lBQzNEO1FBQUVILElBQUk7UUFBR0MsT0FBTztRQUFnQkMsTUFBTTtRQUFpQkMsY0FBYztJQUFNO0lBQzNFO1FBQUVILElBQUk7UUFBR0MsT0FBTztRQUFXQyxNQUFNO1FBQVlDLGNBQWM7SUFBTTtJQUNqRTtRQUFFSCxJQUFJO1FBQUdDLE9BQU87UUFBV0MsTUFBTTtRQUFZQyxjQUFjO0lBQU07SUFDakU7UUFBRUgsSUFBSTtRQUFHQyxPQUFPO1FBQVdDLE1BQU07UUFBU0MsY0FBYztJQUFNO0NBQy9EO0FBUUQsTUFBTUMsYUFBd0M7UUFBQyxFQUFFQyxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsY0FBYyxFQUFFO0lBQ2pGLHFCQUNFLDhEQUFDQztRQUFHQyxXQUFVO1FBQWNDLE9BQU87WUFBRUMsU0FBU04sU0FBUyxVQUFVO1FBQU87a0JBQ3JFTixVQUFVYSxHQUFHLENBQUMsQ0FBQ0M7Z0JBTUxBO2lDQUxULDhEQUFDQztnQkFBaUJMLFdBQVcsR0FBd0RILE9BQXJETyxLQUFLVixZQUFZLEdBQUcsMkJBQTJCLElBQUcsS0FBMkMsT0FBeENHLGFBQWFPLEtBQUtaLEtBQUssR0FBRyxXQUFXOztrQ0FDeEgsOERBQUNKLGlEQUFJQTt3QkFBQ2tCLE1BQU1GLEtBQUtYLElBQUk7a0NBQUdXLEtBQUtaLEtBQUs7Ozs7OztvQkFDakNZLEtBQUtWLFlBQVksa0JBQ2hCOzswQ0FDRSw4REFBQ0s7Z0NBQUdDLFdBQVU7Z0NBQWtCQyxPQUFPO29DQUFFQyxTQUFTTCxhQUFhTyxLQUFLWixLQUFLLEdBQUcsVUFBVTtnQ0FBTzsyQ0FDMUZZLGlCQUFBQSxLQUFLRyxRQUFRLGNBQWJILHFDQUFBQSxlQUFlRCxHQUFHLENBQUMsQ0FBQ0ssd0JBQ25CLDhEQUFDSDtrREFDQyw0RUFBQ2pCLGlEQUFJQTs0Q0FBQ2tCLE1BQU1FLFFBQVFmLElBQUk7c0RBQUdlLFFBQVFoQixLQUFLOzs7Ozs7dUNBRGpDZ0IsUUFBUWpCLEVBQUU7Ozs7Ozs7Ozs7MENBS3ZCLDhEQUFDa0I7Z0NBQUtDLFNBQVMsSUFBTVosZUFBZU0sS0FBS1osS0FBSztnQ0FBR1EsV0FBVywyQkFBbUUsT0FBeENILGFBQWFPLEtBQUtaLEtBQUssR0FBRyxXQUFXOzs7Ozs7Ozs7ZUFYekhZLEtBQUtiLEVBQUU7Ozs7Ozs7Ozs7O0FBa0J4QjtLQXRCTUk7QUF3Qk4sK0RBQWVBLFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2xheW91dHMvaGVhZGVycy9Nb2JpbGVNZW51LnRzeD83ZTM2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgTWVudUl0ZW0ge1xuICBpZDogbnVtYmVyO1xuICB0aXRsZTogc3RyaW5nO1xuICBsaW5rOiBzdHJpbmc7XG4gIGhhc19kcm9wZG93bjogYm9vbGVhbjtcbiAgc3ViX21lbnU/OiB7IGlkOiBudW1iZXI7IHRpdGxlOiBzdHJpbmc7IGxpbms6IHN0cmluZyB9W107XG59XG5cbmNvbnN0IG1lbnVfZGF0YTogTWVudUl0ZW1bXSA9IFtcbiAgeyBpZDogMSwgdGl0bGU6IFwiRXZlbnRzXCIsIGxpbms6ICcvZXZlbnRzJywgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiAyLCB0aXRsZTogXCJFeFwiLCBsaW5rOiAnL2ZhaXInLCBoYXNfZHJvcGRvd246IGZhbHNlIH0sXG4gIHsgaWQ6IDMsIHRpdGxlOiBcIlN0dWRpb3NcIiwgbGluazogJy9zdHVkaW9zJywgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiA0LCB0aXRsZTogXCJTYWxlXCIsIGxpbms6ICcvc2FsZScsIGhhc19kcm9wZG93bjogZmFsc2UgfSxcbiAgeyBpZDogNSwgdGl0bGU6IFwiSW5zdGFsbGF0aW9uXCIsIGxpbms6ICcvaW5zdGFsbGF0aW9uJywgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiA2LCB0aXRsZTogXCJDb250YWN0XCIsIGxpbms6IFwiL2NvbnRhY3RcIiwgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiA3LCB0aXRsZTogXCJTaWduIEluXCIsIGxpbms6IFwiL3NpZ24taW5cIiwgaGFzX2Ryb3Bkb3duOiBmYWxzZSB9LFxuICB7IGlkOiA4LCB0aXRsZTogXCLwn5uSIENhcnRcIiwgbGluazogXCIvQ2FydFwiLCBoYXNfZHJvcGRvd246IGZhbHNlIH0sXG5dO1xuXG5pbnRlcmZhY2UgTW9iaWxlTWVudVByb3BzIHtcbiAgYWN0aXZlOiBib29sZWFuO1xuICBuYXZUaXRsZTogc3RyaW5nO1xuICBvcGVuTW9iaWxlTWVudTogKHRpdGxlOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmNvbnN0IE1vYmlsZU1lbnU6IFJlYWN0LkZDPE1vYmlsZU1lbnVQcm9wcz4gPSAoeyBhY3RpdmUsIG5hdlRpdGxlLCBvcGVuTW9iaWxlTWVudSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHVsIGNsYXNzTmFtZT1cImNzX25hdl9saXN0XCIgc3R5bGU9e3sgZGlzcGxheTogYWN0aXZlID8gXCJibG9ja1wiIDogXCJub25lXCIgfX0+XG4gICAgICB7bWVudV9kYXRhLm1hcCgobWVudSkgPT4gKFxuICAgICAgICA8bGkga2V5PXttZW51LmlkfSBjbGFzc05hbWU9e2Ake21lbnUuaGFzX2Ryb3Bkb3duID8gXCJtZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIgOiBcIlwifSAke25hdlRpdGxlID09PSBtZW51LnRpdGxlID8gXCJhY3RpdmVcIiA6IFwiXCJ9YH0+XG4gICAgICAgICAgPExpbmsgaHJlZj17bWVudS5saW5rfT57bWVudS50aXRsZX08L0xpbms+XG4gICAgICAgICAge21lbnUuaGFzX2Ryb3Bkb3duICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjc19tZWdhX3dyYXBwZXJcIiBzdHlsZT17eyBkaXNwbGF5OiBuYXZUaXRsZSA9PT0gbWVudS50aXRsZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiIH19PlxuICAgICAgICAgICAgICAgIHttZW51LnN1Yl9tZW51Py5tYXAoKHN1Yk1lbnUpID0+IChcbiAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e3N1Yk1lbnUuaWR9PlxuICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtzdWJNZW51Lmxpbmt9PntzdWJNZW51LnRpdGxlfTwvTGluaz5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9wZW5Nb2JpbGVNZW51KG1lbnUudGl0bGUpfSBjbGFzc05hbWU9e2Bjc19tdW51X2Ryb3Bkb3duX3RvZ2dsZSAke25hdlRpdGxlID09PSBtZW51LnRpdGxlID8gXCJhY3RpdmVcIiA6IFwiXCJ9YH0+PC9zcGFuPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9saT5cbiAgICAgICkpfVxuICAgIDwvdWw+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb2JpbGVNZW51OyJdLCJuYW1lcyI6WyJMaW5rIiwiUmVhY3QiLCJtZW51X2RhdGEiLCJpZCIsInRpdGxlIiwibGluayIsImhhc19kcm9wZG93biIsIk1vYmlsZU1lbnUiLCJhY3RpdmUiLCJuYXZUaXRsZSIsIm9wZW5Nb2JpbGVNZW51IiwidWwiLCJjbGFzc05hbWUiLCJzdHlsZSIsImRpc3BsYXkiLCJtYXAiLCJtZW51IiwibGkiLCJocmVmIiwic3ViX21lbnUiLCJzdWJNZW51Iiwic3BhbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/layouts/headers/MobileMenu.tsx\n"));

/***/ })

});