import "./TestOtp.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

interface ApiKey {
  id: string;
  name: string;
}

interface Template {
  id: string;
  name: string;
}

export default function TestOtp() {
  const [loading, setLoading] = useState(false);
  const [apikeys, setApiKeys] = useState<ApiKey[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [form, setForm] = useState({
    apiKeyId: "",
    recipient: "",
    templateName: "",
  });
  const [otpToVerify, setOtpToVerify] = useState("");
  const [sentOtp, setSentOtp] = useState("");

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [keyRes, templateRes] = await Promise.all([
        axios.get("/apikeys"),
        axios.get("/templates"),
      ]);

      setApiKeys(keyRes.data);
      setTemplates(templateRes.data);
    } catch {
      toast.error("Failed to load test settings ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!form.apiKeyId || !form.templateName || !form.recipient) {
      return toast.error("Complete all fields ❌");
    }
    setLoading(true);

    try {
      const res = await axios.post("/otp/send", form);
      toast.success("OTP Sent ✅ Check your email");

      if (res.data?.otp) {
        setSentOtp(res.data.otp);
        toast(`Debug OTP: ${res.data.otp}`, {
          icon: "🔢",
        });
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Sending failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!form.apiKeyId || !otpToVerify) {
      return toast.error("Enter OTP to verify ❌");
    }
    setLoading(true);

    try {
      const res = await axios.post("/otp/verify", {
        apiKeyId: form.apiKeyId,
        otp: otpToVerify,
      });

      if (res.data?.success) {
        toast.success("OTP Verified ✅");
        setOtpToVerify("");
        setSentOtp("");
      } else {
        toast.error("Invalid OTP ❌");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="testotp-container">
      {loading && <Loader />}

      <h2>Send Test OTP</h2>

      <div className="testotp-form">
        <select
          value={form.apiKeyId}
          onChange={(e) => setForm({ ...form, apiKeyId: e.target.value })}
        >
          <option value="">Select API Key</option>
          {apikeys.map((k) => (
            <option key={k.id} value={k.id}>
              {k.name || "API Key"}
            </option>
          ))}
        </select>

        <select
          value={form.templateName}
          onChange={(e) => setForm({ ...form, templateName: e.target.value })}
        >
          <option value="">Select Template</option>
          {templates.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="email"
          placeholder="Email to send OTP"
          value={form.recipient}
          onChange={(e) => setForm({ ...form, recipient: e.target.value })}
        />

        <button onClick={() => void handleSend()}>Send OTP 🚀</button>

        {sentOtp && (
          <div className="verify-section">
            <h3>Verify OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP code"
              value={otpToVerify}
              onChange={(e) => setOtpToVerify(e.target.value)}
              maxLength={6}
            />
            <button onClick={() => void handleVerify()}>Verify OTP ✅</button>
          </div>
        )}
      </div>
    </div>
  );
}
