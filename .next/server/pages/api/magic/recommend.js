"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/magic/recommend";
exports.ids = ["pages/api/magic/recommend"];
exports.modules = {

/***/ "@pinecone-database/pinecone":
/*!**********************************************!*\
  !*** external "@pinecone-database/pinecone" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@pinecone-database/pinecone");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "openai":
/*!*************************!*\
  !*** external "openai" ***!
  \*************************/
/***/ ((module) => {

module.exports = import("openai");;

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fmagic%2Frecommend&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fmagic%2Frecommend.ts&middlewareConfigBase64=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fmagic%2Frecommend&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fmagic%2Frecommend.ts&middlewareConfigBase64=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _src_pages_api_magic_recommend_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/pages/api/magic/recommend.ts */ \"(api)/./src/pages/api/magic/recommend.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_pages_api_magic_recommend_ts__WEBPACK_IMPORTED_MODULE_3__]);\n_src_pages_api_magic_recommend_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_magic_recommend_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_magic_recommend_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/magic/recommend\",\n        pathname: \"/api/magic/recommend\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _src_pages_api_magic_recommend_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRm1hZ2ljJTJGcmVjb21tZW5kJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGc3JjJTJGcGFnZXMlMkZhcGklMkZtYWdpYyUyRnJlY29tbWVuZC50cyZtaWRkbGV3YXJlQ29uZmlnQmFzZTY0PWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDTDtBQUMxRDtBQUMrRDtBQUMvRDtBQUNBLGlFQUFlLHdFQUFLLENBQUMsOERBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sZUFBZSx3RUFBSyxDQUFDLDhEQUFRO0FBQ3BDO0FBQ08sd0JBQXdCLGdIQUFtQjtBQUNsRDtBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZO0FBQ1osQ0FBQzs7QUFFRCxxQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVtYWdpYy1haS8/MzVjMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlc0FQSVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvcGFnZXMtYXBpL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IGhvaXN0IH0gZnJvbSBcIm5leHQvZGlzdC9idWlsZC90ZW1wbGF0ZXMvaGVscGVyc1wiO1xuLy8gSW1wb3J0IHRoZSB1c2VybGFuZCBjb2RlLlxuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi4vc3JjL3BhZ2VzL2FwaS9tYWdpYy9yZWNvbW1lbmQudHNcIjtcbi8vIFJlLWV4cG9ydCB0aGUgaGFuZGxlciAoc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGV4cG9ydCkuXG5leHBvcnQgZGVmYXVsdCBob2lzdCh1c2VybGFuZCwgXCJkZWZhdWx0XCIpO1xuLy8gUmUtZXhwb3J0IGNvbmZpZy5cbmV4cG9ydCBjb25zdCBjb25maWcgPSBob2lzdCh1c2VybGFuZCwgXCJjb25maWdcIik7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tYWdpYy9yZWNvbW1lbmRcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9tYWdpYy9yZWNvbW1lbmRcIixcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBhcmVuJ3QgdXNlZCBpbiBwcm9kdWN0aW9uLlxuICAgICAgICBidW5kbGVQYXRoOiBcIlwiLFxuICAgICAgICBmaWxlbmFtZTogXCJcIlxuICAgIH0sXG4gICAgdXNlcmxhbmRcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlcy1hcGkuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fmagic%2Frecommend&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fmagic%2Frecommend.ts&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./src/pages/api/api-utils/index.ts":
/*!******************************************!*\
  !*** ./src/pages/api/api-utils/index.ts ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cosineSimilarity: () => (/* binding */ cosineSimilarity),\n/* harmony export */   createEmbedding: () => (/* binding */ createEmbedding),\n/* harmony export */   createEmbeddings: () => (/* binding */ createEmbeddings)\n/* harmony export */ });\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ \"openai\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([openai__WEBPACK_IMPORTED_MODULE_0__]);\nopenai__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n// Your OpenAI API key goes here\nconst apiKey = process.env.OPENAI_API_KEY;\nconst openai = new openai__WEBPACK_IMPORTED_MODULE_0__.OpenAIApi(new openai__WEBPACK_IMPORTED_MODULE_0__.Configuration({\n    apiKey\n}));\nasync function createEmbedding(text) {\n    const parameters = {\n        model: \"text-embedding-ada-002\",\n        input: text\n    };\n    const response = await openai.createEmbedding(parameters);\n    return response.data.data[0].embedding;\n}\nasync function createEmbeddings(texts) {\n    const parameters = {\n        model: \"text-embedding-ada-002\",\n        input: texts\n    };\n    const response = await openai.createEmbedding(parameters);\n    return response.data.data.map((d)=>d.embedding);\n}\nfunction cosineSimilarity(A, B) {\n    var dotproduct = 0;\n    var mA = 0;\n    var mB = 0;\n    for(var i = 0; i < A.length; i++){\n        dotproduct += A[i] * B[i];\n        mA += A[i] * A[i];\n        mB += B[i] * B[i];\n    }\n    mA = Math.sqrt(mA);\n    mB = Math.sqrt(mB);\n    var similarity = dotproduct / (mA * mB);\n    return similarity;\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2FwaS11dGlscy9pbmRleC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWtEO0FBRWxELGdDQUFnQztBQUNoQyxNQUFNRSxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7QUFDekMsTUFBTUMsU0FBUyxJQUFJTCw2Q0FBU0EsQ0FBQyxJQUFJRCxpREFBYUEsQ0FBQztJQUFFRTtBQUFPO0FBRWpELGVBQWVLLGdCQUFnQkMsSUFBWTtJQUNoRCxNQUFNQyxhQUFhO1FBQ2pCQyxPQUFPO1FBQ1BDLE9BQU9IO0lBQ1Q7SUFDQSxNQUFNSSxXQUFXLE1BQU1OLE9BQU9DLGVBQWUsQ0FBQ0U7SUFDOUMsT0FBT0csU0FBU0MsSUFBSSxDQUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDQyxTQUFTO0FBQ3hDO0FBRU8sZUFBZUMsaUJBQWlCQyxLQUFlO0lBQ3BELE1BQU1QLGFBQWE7UUFDakJDLE9BQU87UUFDUEMsT0FBT0s7SUFDVDtJQUNBLE1BQU1KLFdBQVcsTUFBTU4sT0FBT0MsZUFBZSxDQUFDRTtJQUM5QyxPQUFPRyxTQUFTQyxJQUFJLENBQUNBLElBQUksQ0FBQ0ksR0FBRyxDQUFDLENBQUNDLElBQVdBLEVBQUVKLFNBQVM7QUFDdkQ7QUFFTyxTQUFTSyxpQkFBaUJDLENBQVcsRUFBRUMsQ0FBVztJQUN2RCxJQUFJQyxhQUFhO0lBQ2pCLElBQUlDLEtBQUs7SUFDVCxJQUFJQyxLQUFLO0lBRVQsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlMLEVBQUVNLE1BQU0sRUFBRUQsSUFBSztRQUNqQ0gsY0FBY0YsQ0FBQyxDQUFDSyxFQUFFLEdBQUdKLENBQUMsQ0FBQ0ksRUFBRTtRQUN6QkYsTUFBTUgsQ0FBQyxDQUFDSyxFQUFFLEdBQUdMLENBQUMsQ0FBQ0ssRUFBRTtRQUNqQkQsTUFBTUgsQ0FBQyxDQUFDSSxFQUFFLEdBQUdKLENBQUMsQ0FBQ0ksRUFBRTtJQUNuQjtJQUVBRixLQUFLSSxLQUFLQyxJQUFJLENBQUNMO0lBQ2ZDLEtBQUtHLEtBQUtDLElBQUksQ0FBQ0o7SUFDZixJQUFJSyxhQUFhUCxhQUFjQyxDQUFBQSxLQUFLQyxFQUFDO0lBRXJDLE9BQU9LO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlbWFnaWMtYWkvLi9zcmMvcGFnZXMvYXBpL2FwaS11dGlscy9pbmRleC50cz9jODkyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ3VyYXRpb24sIE9wZW5BSUFwaSB9IGZyb20gXCJvcGVuYWlcIjtcblxuLy8gWW91ciBPcGVuQUkgQVBJIGtleSBnb2VzIGhlcmVcbmNvbnN0IGFwaUtleSA9IHByb2Nlc3MuZW52Lk9QRU5BSV9BUElfS0VZO1xuY29uc3Qgb3BlbmFpID0gbmV3IE9wZW5BSUFwaShuZXcgQ29uZmlndXJhdGlvbih7IGFwaUtleSB9KSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVFbWJlZGRpbmcodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICBjb25zdCBwYXJhbWV0ZXJzID0ge1xuICAgIG1vZGVsOiBcInRleHQtZW1iZWRkaW5nLWFkYS0wMDJcIixcbiAgICBpbnB1dDogdGV4dCxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcGVuYWkuY3JlYXRlRW1iZWRkaW5nKHBhcmFtZXRlcnMpO1xuICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhWzBdLmVtYmVkZGluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUVtYmVkZGluZ3ModGV4dHM6IHN0cmluZ1tdKTogUHJvbWlzZTxudW1iZXJbXVtdPiB7XG4gIGNvbnN0IHBhcmFtZXRlcnMgPSB7XG4gICAgbW9kZWw6IFwidGV4dC1lbWJlZGRpbmctYWRhLTAwMlwiLFxuICAgIGlucHV0OiB0ZXh0cyxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcGVuYWkuY3JlYXRlRW1iZWRkaW5nKHBhcmFtZXRlcnMpO1xuICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhLm1hcCgoZDogYW55KSA9PiBkLmVtYmVkZGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3NpbmVTaW1pbGFyaXR5KEE6IG51bWJlcltdLCBCOiBudW1iZXJbXSkge1xuICB2YXIgZG90cHJvZHVjdCA9IDA7XG4gIHZhciBtQSA9IDA7XG4gIHZhciBtQiA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBBLmxlbmd0aDsgaSsrKSB7XG4gICAgZG90cHJvZHVjdCArPSBBW2ldICogQltpXTtcbiAgICBtQSArPSBBW2ldICogQVtpXTtcbiAgICBtQiArPSBCW2ldICogQltpXTtcbiAgfVxuXG4gIG1BID0gTWF0aC5zcXJ0KG1BKTtcbiAgbUIgPSBNYXRoLnNxcnQobUIpO1xuICB2YXIgc2ltaWxhcml0eSA9IGRvdHByb2R1Y3QgLyAobUEgKiBtQik7XG5cbiAgcmV0dXJuIHNpbWlsYXJpdHk7XG59XG4iXSwibmFtZXMiOlsiQ29uZmlndXJhdGlvbiIsIk9wZW5BSUFwaSIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJPUEVOQUlfQVBJX0tFWSIsIm9wZW5haSIsImNyZWF0ZUVtYmVkZGluZyIsInRleHQiLCJwYXJhbWV0ZXJzIiwibW9kZWwiLCJpbnB1dCIsInJlc3BvbnNlIiwiZGF0YSIsImVtYmVkZGluZyIsImNyZWF0ZUVtYmVkZGluZ3MiLCJ0ZXh0cyIsIm1hcCIsImQiLCJjb3NpbmVTaW1pbGFyaXR5IiwiQSIsIkIiLCJkb3Rwcm9kdWN0IiwibUEiLCJtQiIsImkiLCJsZW5ndGgiLCJNYXRoIiwic3FydCIsInNpbWlsYXJpdHkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/api-utils/index.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/api-utils/magic/pinecone.ts":
/*!***************************************************!*\
  !*** ./src/pages/api/api-utils/magic/pinecone.ts ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getIndex: () => (/* binding */ getIndex),\n/* harmony export */   pineconeUpdateMetadata: () => (/* binding */ pineconeUpdateMetadata),\n/* harmony export */   removeAgentVector: () => (/* binding */ removeAgentVector),\n/* harmony export */   saveAgentVector: () => (/* binding */ saveAgentVector)\n/* harmony export */ });\n/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/types */ \"(api)/./src/utils/types.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ \"(api)/./src/pages/api/api-utils/index.ts\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"@pinecone-database/pinecone\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_2__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([___WEBPACK_IMPORTED_MODULE_1__]);\n___WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst getIndex = async (name)=>{\n    const pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_2__.PineconeClient();\n    await pinecone.init({\n        environment: process.env.PINECONE_ENVIRONMENT,\n        apiKey: process.env.PINECONE_API_KEY\n    });\n    const index = pinecone.Index(name ? name : \"agents\");\n    return index;\n};\nconst saveAgentVector = async (agent)=>{\n    // Now update the Pinecone index:\n    const index = await getIndex();\n    // Create the embedding for this agent:\n    const embedding = await (0,___WEBPACK_IMPORTED_MODULE_1__.createEmbedding)(`Name: ${agent.name}\\n Description: ${agent.description}\\n Prompt: ${agent.prompt}`);\n    await index.upsert({\n        upsertRequest: {\n            vectors: [\n                {\n                    id: agent.id,\n                    values: embedding,\n                    metadata: {\n                        name: agent.name,\n                        description: agent.description,\n                        creatorHandle: agent.creatorHandle,\n                        likes: agent.likes,\n                        isPublic: agent.isPublic,\n                        creatorId: agent.creatorId,\n                        creatorPicture: agent.creatorPicture ? agent.creatorPicture : \"\",\n                        status: agent.status ? agent.status : _utils_types__WEBPACK_IMPORTED_MODULE_0__.AgentStatus.Processing\n                    }\n                }\n            ]\n        }\n    });\n    console.log(\"Updated Pinecone.\");\n};\nconst pineconeUpdateMetadata = async (agentId, fields)=>{\n    const index = await getIndex();\n    await index.update({\n        updateRequest: {\n            id: agentId,\n            setMetadata: {\n                ...fields\n            }\n        }\n    });\n};\nconst removeAgentVector = async (agentId)=>{\n    // Now update the Pinecone index:\n    const index = await getIndex();\n    await index._delete({\n        deleteRequest: {\n            ids: [\n                agentId\n            ]\n        }\n    });\n    console.log(\"Deleted from Pinecone.\");\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2FwaS11dGlscy9tYWdpYy9waW5lY29uZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUNkO0FBQ3dCO0FBRXRELE1BQU1HLFdBQVcsT0FBT0M7SUFDN0IsTUFBTUMsV0FBVyxJQUFJSCx1RUFBY0E7SUFDbkMsTUFBTUcsU0FBU0MsSUFBSSxDQUFDO1FBQ2xCQyxhQUFhQyxRQUFRQyxHQUFHLENBQUNDLG9CQUFvQjtRQUM3Q0MsUUFBUUgsUUFBUUMsR0FBRyxDQUFDRyxnQkFBZ0I7SUFDdEM7SUFFQSxNQUFNQyxRQUFRUixTQUFTUyxLQUFLLENBQUNWLE9BQU9BLE9BQU87SUFDM0MsT0FBT1M7QUFDVCxFQUFFO0FBRUssTUFBTUUsa0JBQWtCLE9BQU9DO0lBQ3BDLGlDQUFpQztJQUNqQyxNQUFNSCxRQUFRLE1BQU1WO0lBRXBCLHVDQUF1QztJQUN2QyxNQUFNYyxZQUFZLE1BQU1oQixrREFBZUEsQ0FDckMsQ0FBQyxNQUFNLEVBQUVlLE1BQU1aLElBQUksQ0FBQyxnQkFBZ0IsRUFBRVksTUFBTUUsV0FBVyxDQUFDLFdBQVcsRUFBRUYsTUFBTUcsTUFBTSxDQUFDLENBQUM7SUFHckYsTUFBTU4sTUFBTU8sTUFBTSxDQUFDO1FBQ2pCQyxlQUFlO1lBQ2JDLFNBQVM7Z0JBQ1A7b0JBQ0VDLElBQUlQLE1BQU1PLEVBQUU7b0JBQ1pDLFFBQVFQO29CQUNSUSxVQUFVO3dCQUNSckIsTUFBTVksTUFBTVosSUFBSTt3QkFDaEJjLGFBQWFGLE1BQU1FLFdBQVc7d0JBQzlCUSxlQUFlVixNQUFNVSxhQUFhO3dCQUNsQ0MsT0FBT1gsTUFBTVcsS0FBSzt3QkFDbEJDLFVBQVVaLE1BQU1ZLFFBQVE7d0JBQ3hCQyxXQUFXYixNQUFNYSxTQUFTO3dCQUMxQkMsZ0JBQWdCZCxNQUFNYyxjQUFjLEdBQUdkLE1BQU1jLGNBQWMsR0FBRzt3QkFDOURDLFFBQVFmLE1BQU1lLE1BQU0sR0FBR2YsTUFBTWUsTUFBTSxHQUFHL0IscURBQVdBLENBQUNnQyxVQUFVO29CQUM5RDtnQkFDRjthQUNEO1FBQ0g7SUFDRjtJQUVBQyxRQUFRQyxHQUFHLENBQUM7QUFDZCxFQUFFO0FBRUssTUFBTUMseUJBQXlCLE9BQ3BDQyxTQUNBQztJQUVBLE1BQU14QixRQUFRLE1BQU1WO0lBQ3BCLE1BQU1VLE1BQU15QixNQUFNLENBQUM7UUFDakJDLGVBQWU7WUFDYmhCLElBQUlhO1lBQ0pJLGFBQWE7Z0JBQ1gsR0FBR0gsTUFBTTtZQUNYO1FBQ0Y7SUFDRjtBQUNGLEVBQUU7QUFFSyxNQUFNSSxvQkFBb0IsT0FBT0w7SUFDdEMsaUNBQWlDO0lBQ2pDLE1BQU12QixRQUFRLE1BQU1WO0lBQ3BCLE1BQU1VLE1BQU02QixPQUFPLENBQUM7UUFBRUMsZUFBZTtZQUFFQyxLQUFLO2dCQUFDUjthQUFRO1FBQUM7SUFBRTtJQUN4REgsUUFBUUMsR0FBRyxDQUFDO0FBQ2QsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVtYWdpYy1haS8uL3NyYy9wYWdlcy9hcGkvYXBpLXV0aWxzL21hZ2ljL3BpbmVjb25lLnRzPzk0MDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdlbnQsIEFnZW50U3RhdHVzIH0gZnJvbSBcIkAvdXRpbHMvdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUVtYmVkZGluZyB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgUGluZWNvbmVDbGllbnQgfSBmcm9tIFwiQHBpbmVjb25lLWRhdGFiYXNlL3BpbmVjb25lXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRJbmRleCA9IGFzeW5jIChuYW1lPzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHBpbmVjb25lID0gbmV3IFBpbmVjb25lQ2xpZW50KCk7XG4gIGF3YWl0IHBpbmVjb25lLmluaXQoe1xuICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5QSU5FQ09ORV9FTlZJUk9OTUVOVCEsXG4gICAgYXBpS2V5OiBwcm9jZXNzLmVudi5QSU5FQ09ORV9BUElfS0VZISxcbiAgfSk7XG5cbiAgY29uc3QgaW5kZXggPSBwaW5lY29uZS5JbmRleChuYW1lID8gbmFtZSA6IFwiYWdlbnRzXCIpO1xuICByZXR1cm4gaW5kZXg7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUFnZW50VmVjdG9yID0gYXN5bmMgKGFnZW50OiBBZ2VudCkgPT4ge1xuICAvLyBOb3cgdXBkYXRlIHRoZSBQaW5lY29uZSBpbmRleDpcbiAgY29uc3QgaW5kZXggPSBhd2FpdCBnZXRJbmRleCgpO1xuXG4gIC8vIENyZWF0ZSB0aGUgZW1iZWRkaW5nIGZvciB0aGlzIGFnZW50OlxuICBjb25zdCBlbWJlZGRpbmcgPSBhd2FpdCBjcmVhdGVFbWJlZGRpbmcoXG4gICAgYE5hbWU6ICR7YWdlbnQubmFtZX1cXG4gRGVzY3JpcHRpb246ICR7YWdlbnQuZGVzY3JpcHRpb259XFxuIFByb21wdDogJHthZ2VudC5wcm9tcHR9YFxuICApO1xuXG4gIGF3YWl0IGluZGV4LnVwc2VydCh7XG4gICAgdXBzZXJ0UmVxdWVzdDoge1xuICAgICAgdmVjdG9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6IGFnZW50LmlkLFxuICAgICAgICAgIHZhbHVlczogZW1iZWRkaW5nLFxuICAgICAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiBhZ2VudC5uYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGFnZW50LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgY3JlYXRvckhhbmRsZTogYWdlbnQuY3JlYXRvckhhbmRsZSxcbiAgICAgICAgICAgIGxpa2VzOiBhZ2VudC5saWtlcyxcbiAgICAgICAgICAgIGlzUHVibGljOiBhZ2VudC5pc1B1YmxpYyxcbiAgICAgICAgICAgIGNyZWF0b3JJZDogYWdlbnQuY3JlYXRvcklkLFxuICAgICAgICAgICAgY3JlYXRvclBpY3R1cmU6IGFnZW50LmNyZWF0b3JQaWN0dXJlID8gYWdlbnQuY3JlYXRvclBpY3R1cmUgOiBcIlwiLFxuICAgICAgICAgICAgc3RhdHVzOiBhZ2VudC5zdGF0dXMgPyBhZ2VudC5zdGF0dXMgOiBBZ2VudFN0YXR1cy5Qcm9jZXNzaW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBQaW5lY29uZS5cIik7XG59O1xuXG5leHBvcnQgY29uc3QgcGluZWNvbmVVcGRhdGVNZXRhZGF0YSA9IGFzeW5jIChcbiAgYWdlbnRJZDogc3RyaW5nLFxuICBmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogYW55IH1cbikgPT4ge1xuICBjb25zdCBpbmRleCA9IGF3YWl0IGdldEluZGV4KCk7XG4gIGF3YWl0IGluZGV4LnVwZGF0ZSh7XG4gICAgdXBkYXRlUmVxdWVzdDoge1xuICAgICAgaWQ6IGFnZW50SWQsXG4gICAgICBzZXRNZXRhZGF0YToge1xuICAgICAgICAuLi5maWVsZHMsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUFnZW50VmVjdG9yID0gYXN5bmMgKGFnZW50SWQ6IHN0cmluZykgPT4ge1xuICAvLyBOb3cgdXBkYXRlIHRoZSBQaW5lY29uZSBpbmRleDpcbiAgY29uc3QgaW5kZXggPSBhd2FpdCBnZXRJbmRleCgpO1xuICBhd2FpdCBpbmRleC5fZGVsZXRlKHsgZGVsZXRlUmVxdWVzdDogeyBpZHM6IFthZ2VudElkXSB9IH0pO1xuICBjb25zb2xlLmxvZyhcIkRlbGV0ZWQgZnJvbSBQaW5lY29uZS5cIik7XG59O1xuIl0sIm5hbWVzIjpbIkFnZW50U3RhdHVzIiwiY3JlYXRlRW1iZWRkaW5nIiwiUGluZWNvbmVDbGllbnQiLCJnZXRJbmRleCIsIm5hbWUiLCJwaW5lY29uZSIsImluaXQiLCJlbnZpcm9ubWVudCIsInByb2Nlc3MiLCJlbnYiLCJQSU5FQ09ORV9FTlZJUk9OTUVOVCIsImFwaUtleSIsIlBJTkVDT05FX0FQSV9LRVkiLCJpbmRleCIsIkluZGV4Iiwic2F2ZUFnZW50VmVjdG9yIiwiYWdlbnQiLCJlbWJlZGRpbmciLCJkZXNjcmlwdGlvbiIsInByb21wdCIsInVwc2VydCIsInVwc2VydFJlcXVlc3QiLCJ2ZWN0b3JzIiwiaWQiLCJ2YWx1ZXMiLCJtZXRhZGF0YSIsImNyZWF0b3JIYW5kbGUiLCJsaWtlcyIsImlzUHVibGljIiwiY3JlYXRvcklkIiwiY3JlYXRvclBpY3R1cmUiLCJzdGF0dXMiLCJQcm9jZXNzaW5nIiwiY29uc29sZSIsImxvZyIsInBpbmVjb25lVXBkYXRlTWV0YWRhdGEiLCJhZ2VudElkIiwiZmllbGRzIiwidXBkYXRlIiwidXBkYXRlUmVxdWVzdCIsInNldE1ldGFkYXRhIiwicmVtb3ZlQWdlbnRWZWN0b3IiLCJfZGVsZXRlIiwiZGVsZXRlUmVxdWVzdCIsImlkcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/api-utils/magic/pinecone.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/magic/recommend.ts":
/*!******************************************!*\
  !*** ./src/pages/api/magic/recommend.ts ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api-utils */ \"(api)/./src/pages/api/api-utils/index.ts\");\n/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/types */ \"(api)/./src/utils/types.ts\");\n/* harmony import */ var _api_utils_magic_pinecone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api-utils/magic/pinecone */ \"(api)/./src/pages/api/api-utils/magic/pinecone.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_utils__WEBPACK_IMPORTED_MODULE_0__, _api_utils_magic_pinecone__WEBPACK_IMPORTED_MODULE_2__]);\n([_api_utils__WEBPACK_IMPORTED_MODULE_0__, _api_utils_magic_pinecone__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nconst getUserInputString = (messages)=>{\n    // construct userMessage as concatenation of all user messages:\n    let userMessage = \"\";\n    messages.map((message)=>{\n        if (message.sender !== _utils_types__WEBPACK_IMPORTED_MODULE_1__.Sender.User) return;\n        userMessage += message.content + \" \";\n    });\n    return userMessage;\n};\nconst handler = async (req, res)=>{\n    let { idToken, messages, chatId } = req.body;\n    if (!idToken || !messages) {\n        return res.status(400).send(\"Params yo!\");\n    }\n    const userId = btoa(idToken);\n    const userVector = await (0,_api_utils__WEBPACK_IMPORTED_MODULE_0__.createEmbedding)(getUserInputString(messages));\n    const index = await (0,_api_utils_magic_pinecone__WEBPACK_IMPORTED_MODULE_2__.getIndex)();\n    const queryResponse = await index.query({\n        queryRequest: {\n            vector: userVector,\n            topK: 10,\n            includeMetadata: true,\n            includeValues: false,\n            filter: {\n                $or: [\n                    {\n                        isPublic: {\n                            $eq: true\n                        }\n                    },\n                    {\n                        creatorId: {\n                            $eq: userId\n                        }\n                    }\n                ]\n            }\n        }\n    });\n    const THRESHOLD = 0.7;\n    let agents = [];\n    queryResponse.matches?.forEach((match)=>{\n        match.score = match.score ? match.score : 0;\n        if (match.score > THRESHOLD) agents.push({\n            id: match.id,\n            ...match.metadata\n        });\n    });\n    res.status(200).send(agents);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL21hZ2ljL3JlY29tbWVuZC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ2lFO0FBRVY7QUFHQTtBQUV2RCxNQUFNRyxxQkFBcUIsQ0FBQ0M7SUFDMUIsK0RBQStEO0lBQy9ELElBQUlDLGNBQWM7SUFDbEJELFNBQVNFLEdBQUcsQ0FBQyxDQUFDQztRQUNaLElBQUlBLFFBQVFDLE1BQU0sS0FBS1AsZ0RBQU1BLENBQUNRLElBQUksRUFBRTtRQUNwQ0osZUFBZUUsUUFBUUcsT0FBTyxHQUFHO0lBQ25DO0lBQ0EsT0FBT0w7QUFDVDtBQUVBLE1BQU1NLFVBQVUsT0FBT0MsS0FBb0JDO0lBQ3pDLElBQUksRUFBRUMsT0FBTyxFQUFFVixRQUFRLEVBQUVXLE1BQU0sRUFBRSxHQUFHSCxJQUFJSSxJQUFJO0lBTTVDLElBQUksQ0FBQ0YsV0FBVyxDQUFDVixVQUFVO1FBQ3pCLE9BQU9TLElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7SUFDOUI7SUFFQSxNQUFNQyxTQUFTQyxLQUFLTjtJQUVwQixNQUFNTyxhQUFhLE1BQU1yQiwyREFBZUEsQ0FBQ0csbUJBQW1CQztJQUU1RCxNQUFNa0IsUUFBUSxNQUFNcEIsbUVBQVFBO0lBRTVCLE1BQU1xQixnQkFBZ0IsTUFBTUQsTUFBTUUsS0FBSyxDQUFDO1FBQ3RDQyxjQUFjO1lBQ1pDLFFBQVFMO1lBQ1JNLE1BQU07WUFDTkMsaUJBQWlCO1lBQ2pCQyxlQUFlO1lBQ2ZDLFFBQVE7Z0JBQ05DLEtBQUs7b0JBQUM7d0JBQUVDLFVBQVU7NEJBQUVDLEtBQUs7d0JBQUs7b0JBQUU7b0JBQUc7d0JBQUVDLFdBQVc7NEJBQUVELEtBQUtkO3dCQUFPO29CQUFFO2lCQUFFO1lBQ3BFO1FBQ0Y7SUFDRjtJQUVBLE1BQU1nQixZQUFZO0lBRWxCLElBQUlDLFNBQWtCLEVBQUU7SUFDeEJiLGNBQWNjLE9BQU8sRUFBRUMsUUFBUSxDQUFDQztRQUM5QkEsTUFBTUMsS0FBSyxHQUFHRCxNQUFNQyxLQUFLLEdBQUdELE1BQU1DLEtBQUssR0FBRztRQUMxQyxJQUFJRCxNQUFNQyxLQUFLLEdBQUdMLFdBQ2hCQyxPQUFPSyxJQUFJLENBQUM7WUFBRUMsSUFBSUgsTUFBTUcsRUFBRTtZQUFFLEdBQUdILE1BQU1JLFFBQVE7UUFBQztJQUNsRDtJQUVBOUIsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ2tCO0FBQ3ZCO0FBRUEsaUVBQWV6QixPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHlwZW1hZ2ljLWFpLy4vc3JjL3BhZ2VzL2FwaS9tYWdpYy9yZWNvbW1lbmQudHM/N2I0MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZXJjZWxSZXF1ZXN0LCBWZXJjZWxSZXNwb25zZSB9IGZyb20gXCJAdmVyY2VsL25vZGVcIjtcbmltcG9ydCB7IGNvc2luZVNpbWlsYXJpdHksIGNyZWF0ZUVtYmVkZGluZyB9IGZyb20gXCIuLi9hcGktdXRpbHNcIjtcbmltcG9ydCB7IGt2IH0gZnJvbSBcIkB2ZXJjZWwva3ZcIjtcbmltcG9ydCB7IEFnZW50LCBNZXNzYWdlLCBTZW5kZXIgfSBmcm9tIFwiQC91dGlscy90eXBlc1wiO1xuaW1wb3J0IHsgdXVpZHY0IH0gZnJvbSBcIkBmaXJlYmFzZS91dGlsXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi9hcGktdXRpbHMvZGJcIjtcbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSBcIi4uL2FwaS11dGlscy9tYWdpYy9waW5lY29uZVwiO1xuXG5jb25zdCBnZXRVc2VySW5wdXRTdHJpbmcgPSAobWVzc2FnZXM6IE1lc3NhZ2VbXSkgPT4ge1xuICAvLyBjb25zdHJ1Y3QgdXNlck1lc3NhZ2UgYXMgY29uY2F0ZW5hdGlvbiBvZiBhbGwgdXNlciBtZXNzYWdlczpcbiAgbGV0IHVzZXJNZXNzYWdlID0gXCJcIjtcbiAgbWVzc2FnZXMubWFwKChtZXNzYWdlKSA9PiB7XG4gICAgaWYgKG1lc3NhZ2Uuc2VuZGVyICE9PSBTZW5kZXIuVXNlcikgcmV0dXJuO1xuICAgIHVzZXJNZXNzYWdlICs9IG1lc3NhZ2UuY29udGVudCArIFwiIFwiO1xuICB9KTtcbiAgcmV0dXJuIHVzZXJNZXNzYWdlO1xufTtcblxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChyZXE6IFZlcmNlbFJlcXVlc3QsIHJlczogVmVyY2VsUmVzcG9uc2UpID0+IHtcbiAgbGV0IHsgaWRUb2tlbiwgbWVzc2FnZXMsIGNoYXRJZCB9ID0gcmVxLmJvZHkgYXMge1xuICAgIGlkVG9rZW46IHN0cmluZztcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdO1xuICAgIGNoYXRJZD86IHN0cmluZztcbiAgfTtcblxuICBpZiAoIWlkVG9rZW4gfHwgIW1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKFwiUGFyYW1zIHlvIVwiKTtcbiAgfVxuXG4gIGNvbnN0IHVzZXJJZCA9IGJ0b2EoaWRUb2tlbik7XG5cbiAgY29uc3QgdXNlclZlY3RvciA9IGF3YWl0IGNyZWF0ZUVtYmVkZGluZyhnZXRVc2VySW5wdXRTdHJpbmcobWVzc2FnZXMpKTtcblxuICBjb25zdCBpbmRleCA9IGF3YWl0IGdldEluZGV4KCk7XG5cbiAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IGluZGV4LnF1ZXJ5KHtcbiAgICBxdWVyeVJlcXVlc3Q6IHtcbiAgICAgIHZlY3RvcjogdXNlclZlY3RvcixcbiAgICAgIHRvcEs6IDEwLFxuICAgICAgaW5jbHVkZU1ldGFkYXRhOiB0cnVlLFxuICAgICAgaW5jbHVkZVZhbHVlczogZmFsc2UsXG4gICAgICBmaWx0ZXI6IHtcbiAgICAgICAgJG9yOiBbeyBpc1B1YmxpYzogeyAkZXE6IHRydWUgfSB9LCB7IGNyZWF0b3JJZDogeyAkZXE6IHVzZXJJZCB9IH1dLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBUSFJFU0hPTEQgPSAwLjc7XG5cbiAgbGV0IGFnZW50czogQWdlbnRbXSA9IFtdO1xuICBxdWVyeVJlc3BvbnNlLm1hdGNoZXM/LmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgbWF0Y2guc2NvcmUgPSBtYXRjaC5zY29yZSA/IG1hdGNoLnNjb3JlIDogMDtcbiAgICBpZiAobWF0Y2guc2NvcmUgPiBUSFJFU0hPTEQpXG4gICAgICBhZ2VudHMucHVzaCh7IGlkOiBtYXRjaC5pZCwgLi4ubWF0Y2gubWV0YWRhdGEgfSBhcyBBZ2VudCk7XG4gIH0pO1xuXG4gIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGFnZW50cyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUVtYmVkZGluZyIsIlNlbmRlciIsImdldEluZGV4IiwiZ2V0VXNlcklucHV0U3RyaW5nIiwibWVzc2FnZXMiLCJ1c2VyTWVzc2FnZSIsIm1hcCIsIm1lc3NhZ2UiLCJzZW5kZXIiLCJVc2VyIiwiY29udGVudCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJpZFRva2VuIiwiY2hhdElkIiwiYm9keSIsInN0YXR1cyIsInNlbmQiLCJ1c2VySWQiLCJidG9hIiwidXNlclZlY3RvciIsImluZGV4IiwicXVlcnlSZXNwb25zZSIsInF1ZXJ5IiwicXVlcnlSZXF1ZXN0IiwidmVjdG9yIiwidG9wSyIsImluY2x1ZGVNZXRhZGF0YSIsImluY2x1ZGVWYWx1ZXMiLCJmaWx0ZXIiLCIkb3IiLCJpc1B1YmxpYyIsIiRlcSIsImNyZWF0b3JJZCIsIlRIUkVTSE9MRCIsImFnZW50cyIsIm1hdGNoZXMiLCJmb3JFYWNoIiwibWF0Y2giLCJzY29yZSIsInB1c2giLCJpZCIsIm1ldGFkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/magic/recommend.ts\n");

/***/ }),

/***/ "(api)/./src/utils/types.ts":
/*!****************************!*\
  !*** ./src/utils/types.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AgentStatus: () => (/* binding */ AgentStatus),\n/* harmony export */   Sender: () => (/* binding */ Sender)\n/* harmony export */ });\nvar Sender;\n(function(Sender) {\n    Sender[\"AI\"] = \"AI\";\n    Sender[\"User\"] = \"User\";\n})(Sender || (Sender = {}));\nvar AgentStatus;\n(function(AgentStatus) {\n    AgentStatus[\"Processing\"] = \"Processing\";\n    AgentStatus[\"ViolatesPolicy\"] = \"ViolatesPolicy\";\n    AgentStatus[\"AppearsInSearch\"] = \"AppearsInSearch\";\n    AgentStatus[\"AppearsInRecommendations\"] = \"AppearsInRecommendations\";\n})(AgentStatus || (AgentStatus = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvdHlwZXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O1VBQVlBOzs7R0FBQUEsV0FBQUE7O1VBNENBQzs7Ozs7R0FBQUEsZ0JBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHlwZW1hZ2ljLWFpLy4vc3JjL3V0aWxzL3R5cGVzLnRzP2ExNTUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gU2VuZGVyIHtcbiAgQUkgPSBcIkFJXCIsXG4gIFVzZXIgPSBcIlVzZXJcIixcbn1cblxuZXhwb3J0IHR5cGUgVXNlciA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBoYW5kbGU6IHN0cmluZztcbiAgYmlvPzogc3RyaW5nO1xuICBwaWN0dXJlPzogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBsYXN0TWVzc2FnZWRBdD86IEZpcmViYXNlRmlyZXN0b3JlLlRpbWVzdGFtcDtcbiAgcmVjZW50QWdlbnRzOiBzdHJpbmdbXTtcbn07XG5cbmV4cG9ydCB0eXBlIFVzZXJQbGFuSW5mbyA9IHtcbiAgbWVzc2FnZUNvdW50OiBudW1iZXI7XG4gIHRvdGFsTWVzc2FnZUNvdW50OiBudW1iZXI7XG4gIHRvdGFsVG9rZW5Db3VudDogbnVtYmVyO1xuICBjdXJyZW50UGxhbjogbnVtYmVyO1xuICB1c2VyUGxhbkxhc3RVcGRhdGVkOiBEYXRlO1xuICBzdHJpcGVDdXN0b21lcklkPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgTWVzc2FnZSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgc2VuZGVyOiBTZW5kZXI7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICBjaGF0SWQ6IHN0cmluZztcbiAgYWdlbnRVc2VkPzogc3RyaW5nO1xuICBzb3VyY2VzPzogeyBpZDogc3RyaW5nOyB1cmw6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9W107IC8vIE9ubHkgZm9yIGFnZW50cyB0aGF0IHVzZSBzb3VyY2VzLlxufTtcblxuZXhwb3J0IHR5cGUgQ2hhdCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcbiAgbGFzdEVkaXRlZDogRGF0ZSB8IG51bGw7XG4gIHVzZXJJZDogc3RyaW5nO1xuICBhY3RpdmVBZ2VudElkOiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IGVudW0gQWdlbnRTdGF0dXMge1xuICBQcm9jZXNzaW5nID0gXCJQcm9jZXNzaW5nXCIsXG4gIFZpb2xhdGVzUG9saWN5ID0gXCJWaW9sYXRlc1BvbGljeVwiLFxuICBBcHBlYXJzSW5TZWFyY2ggPSBcIkFwcGVhcnNJblNlYXJjaFwiLFxuICBBcHBlYXJzSW5SZWNvbW1lbmRhdGlvbnMgPSBcIkFwcGVhcnNJblJlY29tbWVuZGF0aW9uc1wiLFxufVxuXG5leHBvcnQgdHlwZSBBZ2VudCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgaHVtYW5SZWFkYWJsZUlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgaXNQdWJsaWM6IGJvb2xlYW47XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNyZWF0b3JJZDogc3RyaW5nO1xuICBjcmVhdG9ySGFuZGxlOiBzdHJpbmc7XG4gIGNyZWF0b3JQaWN0dXJlPzogc3RyaW5nO1xuICBsaWtlczogbnVtYmVyO1xuICBjaGF0czogbnVtYmVyO1xuICBzdGF0dXM6IEFnZW50U3RhdHVzO1xuXG4gIHJlY29tbWVuZGVkUXVlc3Rpb25zPzogc3RyaW5nW107IC8vIElzIHN1Z2dlc3RlZCB0byB0aGUgdXNlciB3aGVuIHRoZXkncmUgY2hhdHRpbmcgd2l0aCB0aGlzIGFnZW50LlxuICBwcm9tcHQ/OiBzdHJpbmc7XG4gIGlzTmV3PzogYm9vbGVhbjtcbiAgbGFzdEVkaXRlZD86IERhdGU7XG5cbiAga25vd2xlZGdlU291cmNlcz86IHN0cmluZ1tdO1xuXG4gIC8vIEZpZWxkcyBmb3IgdGhlIGFnZW50IGxhbmRpbmcgcGFnZTpcbiAgaGlnaGxpZ2h0cz86IHtcbiAgICB1c2VyOiBzdHJpbmc7XG4gICAgYWdlbnQ6IHN0cmluZztcbiAgICBzb3VyY2VzPzogeyBuYW1lOiBzdHJpbmc7IHVybDogc3RyaW5nIH1bXTtcbiAgfVtdO1xuICB2aWRlbz86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEtub3dsZWRnZVNvdXJjZSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG5cbiAgY3JlYXRvcklkOiBzdHJpbmc7XG4gIGxhc3RFZGl0ZWQ/OiBEYXRlO1xuXG4gIGNvbnRlbnQ/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBBZ2VudEtWRGF0YSA9IHtcbiAgY3JlYXRvcklkOiBzdHJpbmc7XG4gIHByb21wdDogc3RyaW5nO1xuICBpc1B1YmxpYzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIENodW5rSW5mbyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgY2h1bms6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIHNvdXJjZUlkOiBzdHJpbmc7XG4gIHNjb3JlOiBudW1iZXI7XG59O1xuIl0sIm5hbWVzIjpbIlNlbmRlciIsIkFnZW50U3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/utils/types.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fmagic%2Frecommend&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fmagic%2Frecommend.ts&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();