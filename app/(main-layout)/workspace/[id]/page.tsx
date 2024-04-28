import PDFGrid from "@/components/pdf-grid";

function WorkspacePage({ params }: { params: { id: string } }) {
  const gridItems = [
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
  ];

  return (
    <div className="p-6">
      {/* TODO: change the name to the name the user picked */}
      <div className="text-2xl font-bold">{`Workspace #${params?.id?.toString()}`}</div>
      <div className="text-xs text-gray-500">
        Created on {new Date().toDateString()}
      </div>
      <PDFGrid pdfs={gridItems} />
    </div>
  );
}

export default WorkspacePage;
