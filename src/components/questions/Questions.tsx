import { Question } from "@/types/questions";
import { JSX } from "react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const StepNavigation = ({ page, setPage, questionsLength }: { page: number, setPage: (page: number) => void, questionsLength: number }): JSX.Element => {
    return <section className="flex items-center justify-center gap-4 mt-6">
        <button
            className="px-5 py-2 cursor-pointer rounded-lg border border-[#5C4D91] bg-transparent hover:bg-white/5 text-subtitle font-[600]"
            disabled={page <= 1}
            style={{
                cursor: page <= 1 ? "not-allowed" : "pointer",
                opacity: page <= 1 ? 0.5 : 1,
            }}
            onClick={() => setPage(page - 1)}
        >
            Previous
        </button>

        <div className="flex items-center gap-2">
            {Array.from({ length: questionsLength }).map((_, index) => (
                <span
                    key={index}
                    className={`w-3 h-3 rounded-full ${page === index + 1 ? "bg-[#8EA5FF]" : "bg-[#6F6892]"} `}
                />
            ))}
        </div>

        <button
            className="px-4 py-2 cursor-pointer rounded-lg border border-[#5C4D91] bg-transparent hover:bg-white/5 text-subtitle font-[600]"
            disabled={page >= questionsLength}
            style={{
                cursor: page >= questionsLength ? "not-allowed" : "pointer",
                opacity: page >= questionsLength ? 0.5 : 1,
            }}
            onClick={() => setPage(page + 1)}
        >
            Next
        </button>
    </section>
}

const Questions = ({ page, setPage, questions }: { page: number, setPage: (page: number) => void, questions: Question[] }): JSX.Element => {
    return <div>
        <div>{questions.map((question: Question, index: number): JSX.Element => (
            page === index + 1 ? <div key={index + '-shadowbank-question'} className="flex">
                <div className="container w-[80%] m-auto p-8">
                    <p className="text-big mb-4">{question.question}</p>
                    {question.variants !== undefined &&
                        <div>
                            {question.type === "textareaGroup" && <div>
                                {question.variants.map((variant: string, index: number): JSX.Element => {
                                    return <div key={index + '-shadowbank-question-textareaGroup'}>
                                        <p className="text-title" >{variant}</p>
                                        <div className="mt-2 mb-4"><Textarea placeholder="Text the answer..." className="h-[100px]" /></div>
                                    </div>
                                })}
                            </div>}
                            {question.type === 'multipleChoice' && <div>
                                {question.variants.map((variant: string, index: number): JSX.Element => {
                                    return <div key={index + '-shadowbank-questions-multipleChoice'}>
                                        <label className="flex cursor-pointer items-center space-x-2">
                                            <Checkbox />
                                            <span className="text-title">{variant}</span>
                                        </label>
                                    </div>
                                })}
                            </div>}
                            {question.type === 'singleChoice' && <div>
                                {question.variants.map((variant: string, index: number): JSX.Element => (
                                    <label
                                        key={index + '-shadowbank-questions-singleChoice'}
                                        className="flex items-center space-x-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            className="w-4 h-4"
                                            name={`question-${question.id}`}
                                            value={variant}
                                        />
                                        <span className="text-title">{variant}</span>
                                    </label>
                                ))}
                            </div>}
                        </div>
                    }

                    {question.type === 'input' && <div>
                        <Input type="text" className="mt-4" placeholder="Answer" />
                    </div>}

                    {question.type === 'textarea' && <div>
                        <Textarea placeholder="Text the answer..." className="h-[100px]" />
                    </div>}
                </div>
            </div> : <div key={index}></div>
        ))}
        </div>
        <div><StepNavigation page={page} setPage={setPage} questionsLength={questions.length} /></div>
    </div>
}

export default Questions;