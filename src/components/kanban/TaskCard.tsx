import { Card } from '@/types/kanban';
import { useKanban } from '@/context/KanbanContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Calendar, CheckSquare, GripVertical, MessageSquare } from 'lucide-react';
import CardDetailDialog from './CardDetailDialog';

interface Props {
  card: Card;
  isOverlay?: boolean;
}

export default function TaskCard({ card, isOverlay }: Props) {
  const { state } = useKanban();
  const [detailOpen, setDetailOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: 'card', listId: card.listId },
    disabled: isOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const labels = state.labels.filter(l => card.labels.includes(l.id));
  const members = state.users.filter(u => card.memberIds.includes(u.id));
  const checkDone = card.checklist.filter(i => i.completed).length;
  const checkTotal = card.checklist.length;
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-card rounded-lg border border-border/40 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 group flex gap-1.5 p-2 sm:gap-2 sm:p-3"
      >
        {!isOverlay && (
          <button
            type="button"
            className="touch-none mt-0.5 flex-shrink-0 self-start rounded p-0.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground cursor-grab active:cursor-grabbing"
            aria-label={`Drag card ${card.title}`}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}
        <div
          className="min-w-0 flex-1 cursor-pointer py-0.5"
          onClick={() => !isDragging && setDetailOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!isDragging) setDetailOpen(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {/* Labels */}
          {labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {labels.map(l => (
                <span
                  key={l.id}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `hsl(var(--label-${l.color}) / 0.15)`, color: `hsl(var(--label-${l.color}))` }}
                >
                  {l.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <p className="text-sm font-medium text-foreground leading-snug">{card.title}</p>

          {/* Metadata */}
          {(card.dueDate || checkTotal > 0 || card.comments.length > 0 || members.length > 0) && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {card.dueDate && (
                <span className={`flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded ${isOverdue ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground'}`}>
                  <Calendar className="h-3 w-3" />
                  {new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
              {checkTotal > 0 && (
                <span className={`flex items-center gap-1 text-[11px] ${checkDone === checkTotal ? 'text-label-green' : 'text-muted-foreground'}`}>
                  <CheckSquare className="h-3 w-3" /> {checkDone}/{checkTotal}
                </span>
              )}
              {card.comments.length > 0 && (
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MessageSquare className="h-3 w-3" /> {card.comments.length}
                </span>
              )}
              {members.length > 0 && (
                <div className="flex -space-x-1 ml-auto">
                  {members.slice(0, 3).map(m => (
                    <div
                      key={m.id}
                      className="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-bold text-primary-foreground ring-2 ring-card"
                      style={{ backgroundColor: m.color }}
                      title={m.name}
                    >
                      {m.avatar}
                    </div>
                  ))}
                  {members.length > 3 && (
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground ring-2 ring-card">
                      +{members.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <CardDetailDialog card={card} open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}
