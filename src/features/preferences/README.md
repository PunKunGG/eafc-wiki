# Preferences (planned V1)

ขอบเขต: selected controller และรายการโปรดใน browser เดิม

- Client hook อ่าน/เขียน localStorage หลัง hydration
- Key: `fc26-playbook:preferences:v1`
- ตรวจ platform และ favorite slugs ที่อ่านจาก storage
- จับ JSON/storage errors และใช้ in-memory state ต่อได้
- ไม่ใส่ API, account หรือ cross-device sync ใน V1

ยังไม่มี implementation ใน bootstrap
