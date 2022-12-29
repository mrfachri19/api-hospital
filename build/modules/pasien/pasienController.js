/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const pasienModel = require("./pasienModel");
const helperWrapper = require("../../helper/wrapper");
const {
  v4: uuidv4
} = require("uuid");
module.exports = {
  getAllPasien: async (req, res) => {
    try {
      let {
        page,
        limit,
        search,
        sort
      } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama_pasien ASC";
      let offset = page * limit - limit;
      const totalData = await pasienModel.getCountPasien(search);
      const totalPage = Math.ceil(totalData / limit);
      if (totalPage < page) {
        offset = 0;
        page = 1;
      }
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      };
      const result = await pasienModel.getAllPasien(limit, offset, search, sort);
      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Data not found !`, []);
      }
      return helperWrapper.response(res, 200, "Success get data", result, pageInfo);
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad request (${error.message})`, null);
    }
  },
  postPasien: async (req, res) => {
    try {
      const {
        kode_rm,
        nama_pasien,
        jenis_kelamin,
        umur,
        alamat,
        // pengobatan,
        td,
        diagnosa,
        // therapy,
        bagian
      } = req.body;
      const setData = {
        id: uuidv4(),
        kode_rm,
        nama_pasien,
        jenis_kelamin,
        umur,
        alamat,
        // pengobatan,
        td,
        diagnosa,
        // therapy,
        bagian,
        CreatedAt: new Date(Date.now())
      };
      const result = await pasienModel.postPasien(setData);
      return helperWrapper.response(res, 200, "Succes create data", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  historyAllpasien: async (req, res) => {
    try {
      let {
        page,
        limit,
        search,
        sort
      } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama_pasien ASC";
      let offset = page * limit - limit;
      const totalData = await pasienModel.getCountPasien(search);
      const totalPage = Math.ceil(totalData / limit);
      if (totalPage < page) {
        offset = 0;
        page = 1;
      }
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      };
      const result = await pasienModel.historyAllpasien(limit, offset, search, sort);
      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Data not found !`, []);
      }
      return helperWrapper.response(res, 200, "Success get data", result, pageInfo);
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad request (${error.message})`, null);
    }
  }

  // getPasienById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const result = await movieModel.getPasienById(id);
  //     if (result.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `data by id ${id} not found !`,
  //         null
  //       );
  //     }
  //     // PROSES UNTUK MENYIMPAN DATA KE DALAM REDIS
  //     // =====
  //     redis.setex(`getPasien:${id}`, 3600, JSON.stringify(result));
  //     // ======
  //     return helperWrapper.response(res, 200, "succes get data by id", result);
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXNpZW5Nb2RlbCIsInJlcXVpcmUiLCJoZWxwZXJXcmFwcGVyIiwidjQiLCJ1dWlkdjQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0QWxsUGFzaWVuIiwicmVxIiwicmVzIiwicGFnZSIsImxpbWl0Iiwic2VhcmNoIiwic29ydCIsInF1ZXJ5IiwiTnVtYmVyIiwib2Zmc2V0IiwidG90YWxEYXRhIiwiZ2V0Q291bnRQYXNpZW4iLCJ0b3RhbFBhZ2UiLCJNYXRoIiwiY2VpbCIsInBhZ2VJbmZvIiwicmVzdWx0IiwibGVuZ3RoIiwicmVzcG9uc2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJwb3N0UGFzaWVuIiwia29kZV9ybSIsIm5hbWFfcGFzaWVuIiwiamVuaXNfa2VsYW1pbiIsInVtdXIiLCJhbGFtYXQiLCJ0ZCIsImRpYWdub3NhIiwiYmFnaWFuIiwiYm9keSIsInNldERhdGEiLCJpZCIsIkNyZWF0ZWRBdCIsIkRhdGUiLCJub3ciLCJoaXN0b3J5QWxscGFzaWVuIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcGFzaWVuL3Bhc2llbkNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXHJcbmNvbnN0IHBhc2llbk1vZGVsID0gcmVxdWlyZShcIi4vcGFzaWVuTW9kZWxcIik7XHJcbmNvbnN0IGhlbHBlcldyYXBwZXIgPSByZXF1aXJlKFwiLi4vLi4vaGVscGVyL3dyYXBwZXJcIik7XHJcbmNvbnN0IHsgdjQ6IHV1aWR2NCB9ID0gcmVxdWlyZShcInV1aWRcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBnZXRBbGxQYXNpZW46IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHsgcGFnZSwgbGltaXQsIHNlYXJjaCwgc29ydCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBwYWdlID0gTnVtYmVyKHBhZ2UpIHx8IDE7XHJcbiAgICAgIGxpbWl0ID0gTnVtYmVyKGxpbWl0KSB8fCAxMDtcclxuICAgICAgc2VhcmNoID0gc2VhcmNoIHx8IFwiXCI7XHJcbiAgICAgIHNvcnQgPSBzb3J0IHx8IFwibmFtYV9wYXNpZW4gQVNDXCI7XHJcblxyXG4gICAgICBsZXQgb2Zmc2V0ID0gcGFnZSAqIGxpbWl0IC0gbGltaXQ7XHJcbiAgICAgIGNvbnN0IHRvdGFsRGF0YSA9IGF3YWl0IHBhc2llbk1vZGVsLmdldENvdW50UGFzaWVuKHNlYXJjaCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsUGFnZSA9IE1hdGguY2VpbCh0b3RhbERhdGEgLyBsaW1pdCk7XHJcblxyXG4gICAgICBpZiAodG90YWxQYWdlIDwgcGFnZSkge1xyXG4gICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgcGFnZSA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhZ2VJbmZvID0ge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgdG90YWxQYWdlLFxyXG4gICAgICAgIGxpbWl0LFxyXG4gICAgICAgIHRvdGFsRGF0YSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhc2llbk1vZGVsLmdldEFsbFBhc2llbihcclxuICAgICAgICBsaW1pdCxcclxuICAgICAgICBvZmZzZXQsXHJcbiAgICAgICAgc2VhcmNoLFxyXG4gICAgICAgIHNvcnRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKHJlcywgMjAwLCBgRGF0YSBub3QgZm91bmQgIWAsIFtdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXHJcbiAgICAgICAgcmVzLFxyXG4gICAgICAgIDIwMCxcclxuICAgICAgICBcIlN1Y2Nlc3MgZ2V0IGRhdGFcIixcclxuICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgcGFnZUluZm9cclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxyXG4gICAgICAgIHJlcyxcclxuICAgICAgICA0MDAsXHJcbiAgICAgICAgYEJhZCByZXF1ZXN0ICgke2Vycm9yLm1lc3NhZ2V9KWAsXHJcbiAgICAgICAgbnVsbFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHBvc3RQYXNpZW46IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGtvZGVfcm0sXHJcbiAgICAgICAgbmFtYV9wYXNpZW4sXHJcbiAgICAgICAgamVuaXNfa2VsYW1pbixcclxuICAgICAgICB1bXVyLFxyXG4gICAgICAgIGFsYW1hdCxcclxuICAgICAgICAvLyBwZW5nb2JhdGFuLFxyXG4gICAgICAgIHRkLFxyXG4gICAgICAgIGRpYWdub3NhLFxyXG4gICAgICAgIC8vIHRoZXJhcHksXHJcbiAgICAgICAgYmFnaWFuLFxyXG4gICAgICB9ID0gcmVxLmJvZHk7XHJcbiAgICAgIGNvbnN0IHNldERhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHV1aWR2NCgpLFxyXG4gICAgICAgIGtvZGVfcm0sXHJcbiAgICAgICAgbmFtYV9wYXNpZW4sXHJcbiAgICAgICAgamVuaXNfa2VsYW1pbixcclxuICAgICAgICB1bXVyLFxyXG4gICAgICAgIGFsYW1hdCxcclxuICAgICAgICAvLyBwZW5nb2JhdGFuLFxyXG4gICAgICAgIHRkLFxyXG4gICAgICAgIGRpYWdub3NhLFxyXG4gICAgICAgIC8vIHRoZXJhcHksXHJcbiAgICAgICAgYmFnaWFuLFxyXG4gICAgICAgIENyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSksXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhc2llbk1vZGVsLnBvc3RQYXNpZW4oc2V0RGF0YSk7XHJcbiAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKHJlcywgMjAwLCBcIlN1Y2NlcyBjcmVhdGUgZGF0YVwiLCByZXN1bHQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXHJcbiAgICAgICAgcmVzLFxyXG4gICAgICAgIDQwMCxcclxuICAgICAgICBgYmFkIHJlcXVlc3QgKCR7ZXJyb3IubWVzc2FnZX0pYCxcclxuICAgICAgICBudWxsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaGlzdG9yeUFsbHBhc2llbjogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgeyBwYWdlLCBsaW1pdCwgc2VhcmNoLCBzb3J0IH0gPSByZXEucXVlcnk7XHJcbiAgICAgIHBhZ2UgPSBOdW1iZXIocGFnZSkgfHwgMTtcclxuICAgICAgbGltaXQgPSBOdW1iZXIobGltaXQpIHx8IDEwO1xyXG4gICAgICBzZWFyY2ggPSBzZWFyY2ggfHwgXCJcIjtcclxuICAgICAgc29ydCA9IHNvcnQgfHwgXCJuYW1hX3Bhc2llbiBBU0NcIjtcclxuXHJcbiAgICAgIGxldCBvZmZzZXQgPSBwYWdlICogbGltaXQgLSBsaW1pdDtcclxuICAgICAgY29uc3QgdG90YWxEYXRhID0gYXdhaXQgcGFzaWVuTW9kZWwuZ2V0Q291bnRQYXNpZW4oc2VhcmNoKTtcclxuICAgICAgY29uc3QgdG90YWxQYWdlID0gTWF0aC5jZWlsKHRvdGFsRGF0YSAvIGxpbWl0KTtcclxuXHJcbiAgICAgIGlmICh0b3RhbFBhZ2UgPCBwYWdlKSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICBwYWdlID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGFnZUluZm8gPSB7XHJcbiAgICAgICAgcGFnZSxcclxuICAgICAgICB0b3RhbFBhZ2UsXHJcbiAgICAgICAgbGltaXQsXHJcbiAgICAgICAgdG90YWxEYXRhLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcGFzaWVuTW9kZWwuaGlzdG9yeUFsbHBhc2llbihcclxuICAgICAgICBsaW1pdCxcclxuICAgICAgICBvZmZzZXQsXHJcbiAgICAgICAgc2VhcmNoLFxyXG4gICAgICAgIHNvcnRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKHJlcywgMjAwLCBgRGF0YSBub3QgZm91bmQgIWAsIFtdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXHJcbiAgICAgICAgcmVzLFxyXG4gICAgICAgIDIwMCxcclxuICAgICAgICBcIlN1Y2Nlc3MgZ2V0IGRhdGFcIixcclxuICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgcGFnZUluZm9cclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxyXG4gICAgICAgIHJlcyxcclxuICAgICAgICA0MDAsXHJcbiAgICAgICAgYEJhZCByZXF1ZXN0ICgke2Vycm9yLm1lc3NhZ2V9KWAsXHJcbiAgICAgICAgbnVsbFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vIGdldFBhc2llbkJ5SWQ6IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIC8vICAgdHJ5IHtcclxuICAvLyAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAvLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW92aWVNb2RlbC5nZXRQYXNpZW5CeUlkKGlkKTtcclxuICAvLyAgICAgaWYgKHJlc3VsdC5sZW5ndGggPCAxKSB7XHJcbiAgLy8gICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXHJcbiAgLy8gICAgICAgICByZXMsXHJcbiAgLy8gICAgICAgICA0MDQsXHJcbiAgLy8gICAgICAgICBgZGF0YSBieSBpZCAke2lkfSBub3QgZm91bmQgIWAsXHJcbiAgLy8gICAgICAgICBudWxsXHJcbiAgLy8gICAgICAgKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgICAvLyBQUk9TRVMgVU5UVUsgTUVOWUlNUEFOIERBVEEgS0UgREFMQU0gUkVESVNcclxuICAvLyAgICAgLy8gPT09PT1cclxuICAvLyAgICAgcmVkaXMuc2V0ZXgoYGdldFBhc2llbjoke2lkfWAsIDM2MDAsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gIC8vICAgICAvLyA9PT09PT1cclxuICAvLyAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UocmVzLCAyMDAsIFwic3VjY2VzIGdldCBkYXRhIGJ5IGlkXCIsIHJlc3VsdCk7XHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShcclxuICAvLyAgICAgICByZXMsXHJcbiAgLy8gICAgICAgNDAwLFxyXG4gIC8vICAgICAgIGBiYWQgcmVxdWVzdCAoJHtlcnJvci5tZXNzYWdlfSlgLFxyXG4gIC8vICAgICAgIG51bGxcclxuICAvLyAgICAgKTtcclxuICAvLyAgIH1cclxuICAvLyB9LFxyXG5cclxufTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0EsTUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQzVDLE1BQU1DLGFBQWEsR0FBR0QsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0FBQ3JELE1BQU07RUFBRUUsRUFBRSxFQUFFQztBQUFPLENBQUMsR0FBR0gsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUV0Q0ksTUFBTSxDQUFDQyxPQUFPLEdBQUc7RUFDZkMsWUFBWSxFQUFFLE9B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