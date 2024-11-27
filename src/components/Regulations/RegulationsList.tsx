import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronDown, Scale } from 'lucide-react';
import { Regulation } from '../../types';
import { format } from 'date-fns';
import Markdown from 'react-markdown';

let regulations_collections=[]
const REGULATIONS = [
  {
    name: "Regulation AHL-0: Credit Policy Management",
    content: "**Policy Review:**\n1. Timeframes:\n   - Annual review minimum\n   - Market change triggers\n   - Regulatory updates\n   - Performance indicators\n\n2. Approval Process:\n   - Board approval\n   - Risk committee review\n   - Stakeholder consultation\n   - Implementation plan"
  },
  {
    name: "Regulation AHL-1: Loan Purpose Verification",
    content: "**Acceptable Purposes:**\n1. Documentation Requirements:\n   - Contract of sale\n   - Quotes/invoices\n   - Bank statements\n   - Purpose declaration\n\n2. Verification Methods:\n   - Transaction analysis\n   - Asset verification\n   - Funds tracking\n   - Purpose confirmation"
  },
  {
    name: "Regulation AHL-2: Interest Rate Setting",
    content: "**Rate Determination:**\n1. Variable Rates:\n   - Cost of funds\n   - Risk premium\n   - Competitor analysis\n   - Customer segment\n\n2. Fixed Rates:\n   - Hedge costs\n   - Term premium\n   - Break cost calculation\n   - Margin requirements"
  },
  {
    name: "Regulation AHL-3: Customer Communications",
    content: "**Disclosure Requirements:**\n1. Rate Changes:\n   - 20 days' notice\n   - Method of notification\n   - Repayment impact\n   - Option disclosure\n\n2. Statement Requirements:\n   - Monthly provision\n   - Annual summary\n   - Fee disclosure\n   - Interest calculation"
  },
  {
    name: "Regulation AHL-4: Portfolio Monitoring",
    content: "**Review Requirements:**\n1. Portfolio Metrics:\n   - Arrears rates\n   - LVR distribution\n   - Product mix\n   - Geographic spread\n\n2. Reporting Frequency:\n   - Monthly board report\n   - Quarterly APRA report\n   - Annual review\n   - Ad-hoc analysis"
  },
  {
    name: "Regulation AHL-5: Security Property Management",
    content: "**Property Reviews:**\n1. Scheduled Reviews:\n   - High LVR annual review\n   - Construction completion\n   - Market decline triggers\n   - Risk-based reviews\n\n2. Documentation:\n   - Valuation updates\n   - Condition reports\n   - Insurance currency\n   - Title searches"
  },
  {
    name: "Regulation AHL-6: System Requirements",
    content: "**Core Functions:**\n1. Calculation Accuracy:\n   - Interest computation\n   - Fee processing\n   - Payment allocation\n   - Arrears calculation\n\n2. Data Security:\n   - Access controls\n   - Audit trails\n   - Backup systems\n   - Recovery testing"
  },
  {
    name: "Regulation AHL-7: Risk Rating Systems",
    content: "**Rating Criteria:**\n1. Borrower Risk:\n   - Credit score\n   - Income stability\n   - Employment type\n   - Credit history\n\n2. Security Risk:\n   - Property type\n   - Location rating\n   - Market liquidity\n   - Value volatility\n\n**Monitoring Requirements:**\n1. Review Frequency:\n   - Monthly portfolio review\n   - Quarterly risk assessment\n   - Annual validation\n   - Trigger event review"
  },
  {
    name: "Regulation AHL-8: Broker Obligations and Governance",
    content: "**Licensing Requirements:**\n1. Australian Credit License (ACL):\n   - Current ASIC registration\n   - Responsible Manager requirements\n   - Professional development requirements\n     - 40 hours CPD annually\n     - 20 hours must be formal training\n     - Records maintained for 7 years\n\n2. Professional Indemnity Insurance:\n   - Minimum $2M coverage\n   - EDR scheme membership\n   - Annual renewal verification\n   - Claims history review\n\n**Commission Structure:**\n1. Upfront Commission:\n   - Maximum 1.65% of loan amount\n   - Net of offset balance\n   - Clawback periods documented\n   - Disclosure to client mandatory\n\n2. Trail Commission:\n   - Maximum 0.15% per annum\n   - Based on outstanding balance\n   - Offset balance treatment\n   - Portfolio performance requirements"
  },
  {
    name: "Regulation AHL-9: Foreign Investment Requirements",
    content: "**FIRB Approval Process:**\n1. Required Documentation:\n   - FIRB application number\n   - Approval certificate\n   - Passport verification\n   - Visa status confirmation\n\n**Foreign Income Assessment:**\n1. Income Verification:\n   - Foreign tax returns (2 years)\n   - Employment contracts translated\n   - Bank statements (6 months)\n   - Currency conversion requirements\n     - Using current exchange rates\n     - 20% income shading applied\n\n2. Foreign Credit Checks:\n   - International credit reports\n   - Bank reference checks\n   - Asset verification\n   - Liability confirmation"
  },
  {
    name: "Regulation AHL-10: Construction Loan Requirements",
    content: "**Progress Payment Standards:**\n1. Documentation Requirements:\n   - Council approved plans\n   - Fixed price contract\n   - Builder's insurance\n   - Progress payment schedule\n\n2. Inspection Requirements:\n   - Independent valuation at each stage\n   - Photos of completion\n   - Council sign-offs\n   - Occupancy certificate\n\n**Construction Timeframes:**\n1. Mandatory Completion:\n   - Maximum 12 months\n   - Extension process\n   - Progress reporting\n   - Cost variation management"
  },
  {
    name: "Regulation AHL-11: Hardship and Default Management",
    content: "**Hardship Assessment:**\n1. Early Intervention:\n   - 15-day arrears trigger\n   - Contact requirements\n     - Minimum 3 attempts\n     - Various channels\n   - Financial assessment\n   - Hardship options review\n\n2. Assistance Options:\n   - Reduced payments\n   - Payment moratorium\n   - Loan restructure\n   - Term extension\n   - Documentation requirements\n\n**Default Management:**\n1. Notice Requirements:\n   - Section 88 notice\n   - Default notice timing\n   - Response timeframes\n   - Resolution options"
  },
  {
    name: "Regulation AHL-12: Security Requirements",
    content: "**Acceptable Securities:**\n1. Residential Property:\n   - Minimum size 50m²\n   - Standard construction\n   - Occupancy permit\n   - Zoning compliance\n\n2. Title Requirements:\n   - Clear title search\n   - Registered mortgage\n   - Caveats removal\n   - Outstanding rates check"
  },
  {
    name: "Regulation AHL-13: Self-Employed Borrowers",
    content: "**Income Verification:**\n1. Business Documentation:\n   - 2 years tax returns\n   - Business financial statements\n   - BAS statements (12 months)\n   - Accountant's declaration\n\n2. Income Calculation:\n   - Average of last 2 years\n   - Add-backs allowed:\n     - Depreciation\n     - Interest expenses\n     - One-off expenses\n   - Industry-specific considerations"
  },
  {
    name: "Regulation AHL-14: Guarantor Requirements",
    content: "**Guarantor Assessment:**\n1. Independent Legal Advice:\n   - Certificate of advice\n   - Cooling-off period\n   - Financial impact statement\n   - Separate interviews\n\n2. Guarantor Capacity:\n   - Income verification\n   - Asset position\n   - Exit strategy\n   - Age considerations"
  },
  {
    name: "Regulation AHL-15: Interest Only Lending",
    content: "**APRA Requirements:**\n1. Maximum Terms:\n   - Owner-occupied: 5 years\n   - Investment: 5 years\n   - Extension criteria\n   - Exit strategy\n\n2. Serviceability Assessment:\n   - Principal and interest conversion\n   - Buffer rate application\n   - Income verification\n   - Purpose justification"
  },
  {
    name: "Regulation AHL-16: Portfolio Management",
    content: "**Risk Concentration:**\n1. Geographic Limits:\n   - Maximum 30% in single postcode\n   - High-risk area restrictions\n   - Mining town exposure\n   - Rural property limits\n\n2. Product Concentration:\n   - Interest-only cap\n   - Investment lending cap\n   - High LVR restrictions\n   - Foreign borrower limits"
  },
  {
    name: "Regulation AHL-17: Quality Control Requirements",
    content: "**File Review Standards:**\n1. Pre-Settlement:\n   - 10% minimum sample\n   - High-risk loan review\n   - Document verification\n   - Policy compliance\n\n2. Post-Settlement:\n   - 90-day review\n   - Performance monitoring\n   - Documentation audit\n   - Compliance reporting"
  },
  {
    name: "Regulation AHL-18: Mortgage Insurance Claims",
    content: "**Claims Process:**\n1. Documentation Requirements:\n   - Default history\n   - Collection notes\n   - Property valuation\n   - Recovery actions\n\n2. Timeframe Requirements:\n   - Notice periods\n   - Submission deadlines\n   - Response timeframes\n   - Settlement timing"
  },
  {
    name: "Regulation AHL-19: Electronic Transactions",
    content: "**Digital Requirements:**\n1. VOI Standards:\n   - ID verification\n   - Face matching\n   - Document validation\n   - Record keeping\n\n2. E-signature Requirements:\n   - Authentication methods\n   - Audit trails\n   - Storage standards\n   - Access controls"
  },
  {
    name: "Regulation AHL-20: Environmental Requirements",
    content: "**Property Standards:**\n1. Sustainability Requirements:\n   - Energy rating\n   - Building standards\n   - Flood zones\n   - Bushfire ratings\n\n2. Risk Assessment:\n   - Environmental hazards\n   - Contamination check\n   - Heritage listings\n   - Future zoning changes"
  },
  {
    name: "Regulation AHL-21: Arrears Management",
    content: "**Early Stage Arrears (1-29 days):**\n1. Contact Requirements:\n   - First contact by day 7\n   - Minimum 3 contact attempts\n   - Different channels required:\n     - Phone (minimum 2 attempts)\n     - Email\n     - SMS\n     - Physical mail\n\n2. Documentation:\n   - Income verification (current)\n   - Expense review\n   - Reason for arrears\n   - Action plan documentation\n\n**Late Stage Arrears (30+ days):**\n1. Formal Assessment:\n   - Financial statement required\n   - Hardship application review\n   - Asset position update\n   - Exit strategy evaluation\n\n2. Reporting Requirements:\n   - Credit bureau reporting\n   - LMI notification (if applicable)\n   - Internal risk reporting\n   - APRA reporting standards"
  },
  {
    name: "Regulation AHL-22: Internal Dispute Resolution (IDR)",
    content: "**Response Timeframes:**\n1. Standard Complaints:\n   - Acknowledgment within 24 hours\n   - Resolution within 30 days\n   - Written response required\n   - Extension notification process\n\n2. Urgent Complaints:\n   - Same-day acknowledgment\n   - Resolution within 5 days\n   - Escalation process\n   - Priority handling criteria\n\n**Documentation Requirements:**\n1. Complaint Register:\n   - Unique reference number\n   - Nature of complaint\n   - Resolution steps\n   - Outcome recording\n   - Root cause analysis"
  },
  {
    name: "Regulation AHL-23: External Dispute Resolution (EDR)",
    content: "**AFCA Requirements:**\n1. Member Obligations:\n   - Current membership\n   - Response timeframes\n     - Initial response: 21 days\n     - Additional information: 14 days\n     - Position statement: 14 days\n\n2. Document Management:\n   - File compilation standards\n   - Evidence requirements\n   - System notes retention\n   - Communication records"
  },
  {
    name: "Regulation AHL-24: Document Custody",
    content: "**Physical Document Storage:**\n1. Security Requirements:\n   - Fire-proof storage\n   - Access controls\n   - Environmental controls\n   - Insurance coverage\n\n2. Document Tracking:\n   - Bar coding system\n   - Movement register\n   - Annual audit\n   - Recovery procedures\n\n**Digital Storage:**\n1. System Requirements:\n   - 256-bit encryption\n   - Backup procedures\n   - Access logging\n   - Version control"
  },
  {
    name: "Regulation AHL-25: AML/CTF Compliance",
    content: "**Customer Due Diligence:**\n1. Identification Requirements:\n   - Primary photographic ID\n   - Secondary non-photographic ID\n   - Document verification service\n   - Electronic verification methods\n\n2. Transaction Monitoring:\n   - Source of funds verification\n   - Large transaction reporting\n   - Suspicious activity monitoring\n   - Ongoing due diligence\n\n**Reporting Requirements:**\n1. AUSTRAC Reporting:\n   - Threshold transactions\n   - Suspicious matters\n   - International transfers\n   - Annual compliance report"
  },
  {
    name: "Regulation AHL-26: Power of Attorney Lending",
    content: "**POA Verification:**\n1. Document Requirements:\n   - Original/certified POA\n   - Registration confirmation\n   - Capacity assessment\n   - Enduring power verification\n\n2. Additional Controls:\n   - Independent verification\n   - Conflict check\n   - Purpose verification\n   - Benefit assessment"
  },
  {
    name: "Regulation AHL-27: Trust Structure Lending",
    content: "**Trust Assessment:**\n1. Trust Deed Requirements:\n   - Verified copy\n   - Borrowing powers\n   - Trustee authorities\n   - Beneficiary identification\n\n2. Additional Documentation:\n   - Corporate trustee ASIC search\n   - Individual trustee verification\n   - Tax returns (2 years)\n   - Financial statements"
  },
  {
    name: "Regulation AHL-28: Offset Account Management",
    content: "**Account Setup:**\n1. Eligibility Criteria:\n   - Linked loan types\n   - Maximum accounts\n   - Owner verification\n   - Purpose confirmation\n\n2. Monitoring Requirements:\n   - Balance verification\n   - Interest calculation\n   - Statement production\n   - Annual review"
  },
  {
    name: "Regulation AHL-29: Property Insurance",
    content: "**Insurance Requirements:**\n1. Building Insurance:\n   - Sum insured verification\n   - Bank's interest noted\n   - Annual renewal check\n   - Claims history review\n\n2. Strata Insurance:\n   - Body corporate verification\n   - Coverage adequacy\n   - Premium payment status\n   - Policy currency"
  }]

//const REGULATIONS = "### Regulation AHL-0: Credit Policy Management\n**Policy Review:**\n1. Timeframes:\n   - Annual review minimum\n   - Market change triggers\n   - Regulatory updates\n   - Performance indicators\n\n2. Approval Process:\n   - Board approval\n   - Risk committee review\n   - Stakeholder consultation\n   - Implementation plan\n\n### Regulation AHL-1: Loan Purpose Verification\n**Acceptable Purposes:**\n1. Documentation Requirements:\n   - Contract of sale\n   - Quotes/invoices\n   - Bank statements\n   - Purpose declaration\n\n2. Verification Methods:\n   - Transaction analysis\n   - Asset verification\n   - Funds tracking\n   - Purpose confirmation\n\n### Regulation AHL-2: Interest Rate Setting\n**Rate Determination:**\n1. Variable Rates:\n   - Cost of funds\n   - Risk premium\n   - Competitor analysis\n   - Customer segment\n\n2. Fixed Rates:\n   - Hedge costs\n   - Term premium\n   - Break cost calculation\n   - Margin requirements\n\n### Regulation AHL-3: Customer Communications\n**Disclosure Requirements:**\n1. Rate Changes:\n   - 20 days' notice\n   - Method of notification\n   - Repayment impact\n   - Option disclosure\n\n2. Statement Requirements:\n   - Monthly provision\n   - Annual summary\n   - Fee disclosure\n   - Interest calculation\n\n### Regulation AHL-4: Portfolio Monitoring\n**Review Requirements:**\n1. Portfolio Metrics:\n   - Arrears rates\n   - LVR distribution\n   - Product mix\n   - Geographic spread\n\n2. Reporting Frequency:\n   - Monthly board report\n   - Quarterly APRA report\n   - Annual review\n   - Ad-hoc analysis\n\n### Regulation AHL-5: Security Property Management\n**Property Reviews:**\n1. Scheduled Reviews:\n   - High LVR annual review\n   - Construction completion\n   - Market decline triggers\n   - Risk-based reviews\n\n2. Documentation:\n   - Valuation updates\n   - Condition reports\n   - Insurance currency\n   - Title searches\n\n### Regulation AHL-6: System Requirements\n**Core Functions:**\n1. Calculation Accuracy:\n   - Interest computation\n   - Fee processing\n   - Payment allocation\n   - Arrears calculation\n\n2. Data Security:\n   - Access controls\n   - Audit trails\n   - Backup systems\n   - Recovery testing\n\n### Regulation AHL-7: Risk Rating Systems\n**Rating Criteria:**\n1. Borrower Risk:\n   - Credit score\n   - Income stability\n   - Employment type\n   - Credit history\n\n2. Security Risk:\n   - Property type\n   - Location rating\n   - Market liquidity\n   - Value volatility\n\n**Monitoring Requirements:**\n1. Review Frequency:\n   - Monthly portfolio review\n   - Quarterly risk assessment\n   - Annual validation\n   - Trigger event review\n\n### Regulation AHL-8: Broker Obligations and Governance\n**Licensing Requirements:**\n1. Australian Credit License (ACL):\n   - Current ASIC registration\n   - Responsible Manager requirements\n   - Professional development requirements\n     - 40 hours CPD annually\n     - 20 hours must be formal training\n     - Records maintained for 7 years\n\n2. Professional Indemnity Insurance:\n   - Minimum $2M coverage\n   - EDR scheme membership\n   - Annual renewal verification\n   - Claims history review\n\n**Commission Structure:**\n1. Upfront Commission:\n   - Maximum 1.65% of loan amount\n   - Net of offset balance\n   - Clawback periods documented\n   - Disclosure to client mandatory\n\n2. Trail Commission:\n   - Maximum 0.15% per annum\n   - Based on outstanding balance\n   - Offset balance treatment\n   - Portfolio performance requirements\n\n### Regulation AHL-9: Foreign Investment Requirements\n**FIRB Approval Process:**\n1. Required Documentation:\n   - FIRB application number\n   - Approval certificate\n   - Passport verification\n   - Visa status confirmation\n\n**Foreign Income Assessment:**\n1. Income Verification:\n   - Foreign tax returns (2 years)\n   - Employment contracts translated\n   - Bank statements (6 months)\n   - Currency conversion requirements\n     - Using current exchange rates\n     - 20% income shading applied\n\n2. Foreign Credit Checks:\n   - International credit reports\n   - Bank reference checks\n   - Asset verification\n   - Liability confirmation\n\n### Regulation AHL-10: Construction Loan Requirements\n**Progress Payment Standards:**\n1. Documentation Requirements:\n   - Council approved plans\n   - Fixed price contract\n   - Builder's insurance\n   - Progress payment schedule\n\n2. Inspection Requirements:\n   - Independent valuation at each stage\n   - Photos of completion\n   - Council sign-offs\n   - Occupancy certificate\n\n**Construction Timeframes:**\n1. Mandatory Completion:\n   - Maximum 12 months\n   - Extension process\n   - Progress reporting\n   - Cost variation management\n\n### Regulation AHL-11: Hardship and Default Management\n**Hardship Assessment:**\n1. Early Intervention:\n   - 15-day arrears trigger\n   - Contact requirements\n     - Minimum 3 attempts\n     - Various channels\n   - Financial assessment\n   - Hardship options review\n\n2. Assistance Options:\n   - Reduced payments\n   - Payment moratorium\n   - Loan restructure\n   - Term extension\n   - Documentation requirements\n\n**Default Management:**\n1. Notice Requirements:\n   - Section 88 notice\n   - Default notice timing\n   - Response timeframes\n   - Resolution options\n\n### Regulation AHL-12: Security Requirements\n**Acceptable Securities:**\n1. Residential Property:\n   - Minimum size 50m²\n   - Standard construction\n   - Occupancy permit\n   - Zoning compliance\n\n2. Title Requirements:\n   - Clear title search\n   - Registered mortgage\n   - Caveats removal\n   - Outstanding rates check\n\n### Regulation AHL-13: Self-Employed Borrowers\n**Income Verification:**\n1. Business Documentation:\n   - 2 years tax returns\n   - Business financial statements\n   - BAS statements (12 months)\n   - Accountant's declaration\n\n2. Income Calculation:\n   - Average of last 2 years\n   - Add-backs allowed:\n     - Depreciation\n     - Interest expenses\n     - One-off expenses\n   - Industry-specific considerations\n\n### Regulation AHL-14: Guarantor Requirements\n**Guarantor Assessment:**\n1. Independent Legal Advice:\n   - Certificate of advice\n   - Cooling-off period\n   - Financial impact statement\n   - Separate interviews\n\n2. Guarantor Capacity:\n   - Income verification\n   - Asset position\n   - Exit strategy\n   - Age considerations\n\n### Regulation AHL-15: Interest Only Lending\n**APRA Requirements:**\n1. Maximum Terms:\n   - Owner-occupied: 5 years\n   - Investment: 5 years\n   - Extension criteria\n   - Exit strategy\n\n2. Serviceability Assessment:\n   - Principal and interest conversion\n   - Buffer rate application\n   - Income verification\n   - Purpose justification\n\n### Regulation AHL-16: Portfolio Management\n**Risk Concentration:**\n1. Geographic Limits:\n   - Maximum 30% in single postcode\n   - High-risk area restrictions\n   - Mining town exposure\n   - Rural property limits\n\n2. Product Concentration:\n   - Interest-only cap\n   - Investment lending cap\n   - High LVR restrictions\n   - Foreign borrower limits\n\n### Regulation AHL-17: Quality Control Requirements\n**File Review Standards:**\n1. Pre-Settlement:\n   - 10% minimum sample\n   - High-risk loan review\n   - Document verification\n   - Policy compliance\n\n2. Post-Settlement:\n   - 90-day review\n   - Performance monitoring\n   - Documentation audit\n   - Compliance reporting\n\n### Regulation AHL-18: Mortgage Insurance Claims\n**Claims Process:**\n1. Documentation Requirements:\n   - Default history\n   - Collection notes\n   - Property valuation\n   - Recovery actions\n\n2. Timeframe Requirements:\n   - Notice periods\n   - Submission deadlines\n   - Response timeframes\n   - Settlement timing\n\n### Regulation AHL-19: Electronic Transactions\n**Digital Requirements:**\n1. VOI Standards:\n   - ID verification\n   - Face matching\n   - Document validation\n   - Record keeping\n\n2. E-signature Requirements:\n   - Authentication methods\n   - Audit trails\n   - Storage standards\n   - Access controls\n\n### Regulation AHL-20: Environmental Requirements\n**Property Standards:**\n1. Sustainability Requirements:\n   - Energy rating\n   - Building standards\n   - Flood zones\n   - Bushfire ratings\n\n2. Risk Assessment:\n   - Environmental hazards\n   - Contamination check\n   - Heritage listings\n   - Future zoning changes\n\n### Regulation AHL-21: Arrears Management\n**Early Stage Arrears (1-29 days):**\n1. Contact Requirements:\n   - First contact by day 7\n   - Minimum 3 contact attempts\n   - Different channels required:\n     - Phone (minimum 2 attempts)\n     - Email\n     - SMS\n     - Physical mail\n\n2. Documentation:\n   - Income verification (current)\n   - Expense review\n   - Reason for arrears\n   - Action plan documentation\n\n**Late Stage Arrears (30+ days):**\n1. Formal Assessment:\n   - Financial statement required\n   - Hardship application review\n   - Asset position update\n   - Exit strategy evaluation\n\n2. Reporting Requirements:\n   - Credit bureau reporting\n   - LMI notification (if applicable)\n   - Internal risk reporting\n   - APRA reporting standards\n\n### Regulation AHL-22: Internal Dispute Resolution (IDR)\n**Response Timeframes:**\n1. Standard Complaints:\n   - Acknowledgment within 24 hours\n   - Resolution within 30 days\n   - Written response required\n   - Extension notification process\n\n2. Urgent Complaints:\n   - Same-day acknowledgment\n   - Resolution within 5 days\n   - Escalation process\n   - Priority handling criteria\n\n**Documentation Requirements:**\n1. Complaint Register:\n   - Unique reference number\n   - Nature of complaint\n   - Resolution steps\n   - Outcome recording\n   - Root cause analysis\n\n### Regulation AHL-23: External Dispute Resolution (EDR)\n**AFCA Requirements:**\n1. Member Obligations:\n   - Current membership\n   - Response timeframes\n     - Initial response: 21 days\n     - Additional information: 14 days\n     - Position statement: 14 days\n\n2. Document Management:\n   - File compilation standards\n   - Evidence requirements\n   - System notes retention\n   - Communication records\n\n### Regulation AHL-24: Document Custody\n**Physical Document Storage:**\n1. Security Requirements:\n   - Fire-proof storage\n   - Access controls\n   - Environmental controls\n   - Insurance coverage\n\n2. Document Tracking:\n   - Bar coding system\n   - Movement register\n   - Annual audit\n   - Recovery procedures\n\n**Digital Storage:**\n1. System Requirements:\n   - 256-bit encryption\n   - Backup procedures\n   - Access logging\n   - Version control\n\n### Regulation AHL-25: AML/CTF Compliance\n**Customer Due Diligence:**\n1. Identification Requirements:\n   - Primary photographic ID\n   - Secondary non-photographic ID\n   - Document verification service\n   - Electronic verification methods\n\n2. Transaction Monitoring:\n   - Source of funds verification\n   - Large transaction reporting\n   - Suspicious activity monitoring\n   - Ongoing due diligence\n\n**Reporting Requirements:**\n1. AUSTRAC Reporting:\n   - Threshold transactions\n   - Suspicious matters\n   - International transfers\n   - Annual compliance report\n\n### Regulation AHL-26: Power of Attorney Lending\n**POA Verification:**\n1. Document Requirements:\n   - Original/certified POA\n   - Registration confirmation\n   - Capacity assessment\n   - Enduring power verification\n\n2. Additional Controls:\n   - Independent verification\n   - Conflict check\n   - Purpose verification\n   - Benefit assessment\n\n### Regulation AHL-27: Trust Structure Lending\n**Trust Assessment:**\n1. Trust Deed Requirements:\n   - Verified copy\n   - Borrowing powers\n   - Trustee authorities\n   - Beneficiary identification\n\n2. Additional Documentation:\n   - Corporate trustee ASIC search\n   - Individual trustee verification\n   - Tax returns (2 years)\n   - Financial statements\n\n### Regulation AHL-28: Offset Account Management\n**Account Setup:**\n1. Eligibility Criteria:\n   - Linked loan types\n   - Maximum accounts\n   - Owner verification\n   - Purpose confirmation\n\n2. Monitoring Requirements:\n   - Balance verification\n   - Interest calculation\n   - Statement production\n   - Annual review\n\n### Regulation AHL-29: Property Insurance\n**Insurance Requirements:**\n1. Building Insurance:\n   - Sum insured verification\n   - Bank's interest noted\n   - Annual renewal check\n   - Claims history review\n\n2. Strata Insurance:\n   - Body corporate verification\n   - Coverage adequacy\n   - Premium payment status\n   - Policy currency\n\n### Regulation AHL-30: Settlement Processes\n**Pre-Settlement:**\n1. Document Verification:\n   - Settlement instructions\n   - Funds confirmation\n   - Title search\n   - Insurance confirmation\n\n2. Quality Checks:\n   - Document execution\n   - Condition satisfaction\n   - Authority verification\n   - Security registration\n\n### Regulation AHL-31: Discharge Process\n**Assessment Requirements:**\n1. Release Documentation:\n   - Formal request\n   - Authority verification\n   - Payment calculation\n   - Security release\n\n2. Timeframes:\n   - Processing: 10 business days\n   - Documentation: 3 business days\n   - Settlement booking: 5 business days\n   - Final payout figure: 1 business day\n\n### Regulation AHL-32: Portfolio Stress Testing\n**Test Requirements:**\n1. Scenario Analysis:\n   - Interest rate increases (3%)\n   - Property value decline (30%)\n   - Income reduction (20%)\n   - Unemployment increase (5%)\n\n2. Reporting Requirements:\n   - Quarterly testing\n   - Board reporting\n   - APRA submissions\n   - Remediation plans";

let sample_reg={
  content:REGULATIONS,
  name:"Default Regulation",
  uploadDate:"Wed Nov 27 2024 16:57:39 GMT+1100 (Australian Eastern Daylight Time)",
  id:2732687157429
}
regulations_collections.push(sample_reg)

interface RegulationProps {
  regulations: Regulation[];
}

export const RegulationList: React.FC<RegulationProps> = ({ regulations }) => {
  const navigate = useNavigate();
  const [openText, setOpenText] = React.useState<string | null>(null);

  

  const toggleText = (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    setOpenText(openText === docId ? null : docId);
  };

  return (
    <div className="space-y-3">
      {REGULATIONS.map((regulation) => (
        <div 
          key={regulation.name} 
          className="bg-[#f4f4f4] border border-[#e0e0e0] rounded-none hover:border-[#0f62fe] transition-colors duration-200"
        >
          <div className="p-4">
            {/* Document Header */}
            <div 
              className="cursor-pointer"
              //onClick={() => navigate(`/documents/${regulation.id}`)}
            >
              <div className="flex items-center mb-4">
                <Scale className="h-5 w-5 text-[#4589ff] mr-3" />
                <div>
                  <p className="font-normal text-[#161616] text-sm">{regulation.name}</p>
                  <p className="text-xs text-[#525252] mt-1">
                    Uploaded on {format(new Date(), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="mb-3">
              <button
                onClick={(e) => toggleText(e, regulation.name)}
                className="w-full flex items-center justify-between py-2 text-sm text-[#161616] hover:bg-[#e8e8e8] transition-colors duration-150"
              >
                <span className="font-medium">Regulation Text</span>
                <ChevronDown 
                  className={`h-4 w-4 text-[#161616] transition-transform duration-200 ${
                    openText === regulation.name ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {/* Text Content */}
              <div className={`
                overflow-hidden transition-all duration-200 ease-in-out
                ${openText === regulation.name ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="bg-white border border-[#e0e0e0] p-4 mt-2">
                  <div className="text-sm text-[#161616] prose prose-sm max-w-none">
                    <Markdown 
                      components={{
                        p: ({children}) => <p className="text-[#161616] leading-5">{children}</p>,
                        h1: ({children}) => <h1 className="text-[#161616] text-xl font-light mt-4 mb-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-[#161616] text-lg font-light mt-4 mb-2">{children}</h2>,
                        ul: ({children}) => <ul className="list-disc pl-4 my-2">{children}</ul>,
                        li: ({children}) => <li className="text-[#161616] my-1">{children}</li>,
                      }}
                    >
                      {regulation.content}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegulationList;