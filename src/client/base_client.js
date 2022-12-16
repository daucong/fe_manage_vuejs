import http from "@/http_common";
class BaseClient {
  getEntitysWithPaginh(entity, page, limit, sortname, sortby, query) {
    return http.get(
      "/" +
        entity +
        "?page=" +
        page +
        "&limit=" +
        limit +
        "&sortname=" +
        sortname +
        "&sortby=" +
        sortby +
        "&query=" +
        query
    );
  }
  getAllList(entity) {
    return http.get("/" + entity);
  }
  addEntity(entity, data) {
    return http.post("/" + entity + "/", data);
  }
  uploadURL(data) {
    return http.post("/ImgService", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  findEntityById(entity, id) {
    return http.get(`/` + entity + `/${id}`);
  }
  DeleteEntity(entity, id) {
    return http.delete(`/` + entity + `/${id}`);
  }
}

export default new BaseClient();
