from fastapi import APIRouter
from app.schemas import Report
import app.services.report_service as rs

router = APIRouter(prefix="/reports", tags=["reports"])

@router.post("/", response_model=Report)
def create_report(report: Report):
    return rs.create_report(report)

@router.get("/{report_id}", response_model=Report)
def get_report(report_id: str):
    return rs.get_report(report_id)

@router.put("/{report_id}", response_model=Report)
def update_report(report_id: str, updated_report: Report):
    return rs.update_report(report_id, updated_report)

@router.delete("/{report_id}")
def delete_report(report_id: str):
    return rs.delete_report(report_id)

