from fastapi import HTTPException
from bson import ObjectId
from app.schemas import Report
from app.db import reports_collection

# Helper function to convert MongoDB document to a Report model
def report_helper(report) -> dict:
    return {
        "id": str(report["_id"]),
        "website_id": report["website_id"],
        "visibility_score": report["visibility_score"],
        "competitor_analysis": report["competitor_analysis"],
        "insights": report["insights"],
        "questions_answers": report["questions_answers"],
        "created_at": report["created_at"],
        "updated_at": report["updated_at"],
    }

def create_report(report: Report):
    report_dict = report.dict(by_alias=True)
    result = reports_collection.insert_one(report_dict)
    created_report = reports_collection.find_one({"_id": result.inserted_id})
    return report_helper(created_report)

def get_report(report_id: str):
    report = reports_collection.find_one({"_id": ObjectId(report_id)})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report_helper(report)

def update_report(report_id: str, updated_report: Report):
    result = reports_collection.find_one_and_update(
        {"_id": ObjectId(report_id)},
        {"$set": updated_report.dict(by_alias=True)},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Report not found")
    return report_helper(result)

def delete_report(report_id: str):
    result = reports_collection.delete_one({"_id": ObjectId(report_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"message": "Report deleted successfully"}