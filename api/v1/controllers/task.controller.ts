import { Request, Response } from "express";
import Task from "../models/task.model"
import paginationHelper from "../helpers/pagination"
import searchHelper from "../helpers/search";




export const index = async (req: Request, res: Response) => {
    // Find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    const find: Find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status.toString();
    }

    // End Find

    // Sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }
    // End Sort

    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 2
    }
    const countTask = await Task.countDocuments(find);

    let objPagination = paginationHelper(
        initPagination,
        req.query,
        countTask

    )


    // End Pagination

    // Search
    const objSearch = searchHelper(req.query);

    if (objSearch.regex) {
        find.title = objSearch.regex;
    }
    // ENd Search

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objPagination.limitItems)
        .skip(objPagination.skip);

    res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const task = await Task.find({
        _id: id,
        deleted: false
    });

    res.json(task);
}

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Task.updateOne({
            _id: id
        }, {
            status: status
        });
        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });

    }
}

export const changeMulti = async (req: Request, res: Response) => {
    try {

        enum Key {
            STATUS= "status",
            DELETE= "delete"

        }
        const ids: string[]= req.body.ids
        const key: string= req.body.key
        const value:string  = req.body.value;

        switch (key) {
            case Key.STATUS:
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });

                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!"
                });

                break;
            case Key.DELETE:
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true,
                    deletedAt: new Date()
                });

                res.json({
                    code: 200,
                    message: "Xoá thành công!"
                });

                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại!"
                });
                break;
        }


    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      const data = await task.save();
  
      res.json({
        code: 200,
        message: "Tạo thành công!",
        data: data
      });
  
    } catch (error) {
      res.json({
        code: 400,
        message: "Lỗi!"
      });
    }
}

export const edit = async (req: Request, res: Response ) => {
    try {
      const id = req.params.id;
  
      await Task.updateOne({
        _id: id
      }, req.body)
  
      res.json({
        code: 200,
        message: "Tạo thành công!",
      });
  
    } catch (error) {
      res.json({
        code: 400,
        message: "Lỗi!"
      });
    }
}

export const deleteTask = async (req: Request, res: Response ) =>{
    try {
        const id: string = req.params.id;
    
        await Task.updateOne({
          _id: id
        },{
          deleted:true,
          deletedAt: new Date()
        })
    
        res.json({
          code: 200,
          message: "Xóa thành công!",
        });
    
      } catch (error) {
        res.json({
          code: 400,
          message: "Lỗi!"
        });
      }
}